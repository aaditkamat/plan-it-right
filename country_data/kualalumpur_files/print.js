/* 
 *  Copyright (c) 2013-2014, Inspirock Corporation.
 *  All rights reserved.
 */

// globals for jsLint
/*global require,define,window,ga,$,document*/

require(["modules/utils", "modules/ajax", "jquery"],
    function (utils, ajax) {
        var instance = {};

        var mapBounds,
            directionsCache = {},
            googleMaps = [],
            markerColors = [
                "#0ea407",
                "#8a523a",
                "#62008f",
                "#471d2d",
                "#dc551b",
                "#3b4b57",
                "#9a0b5f",
                "#948903",
                "#1f69b7",
                "#5b2b2c",
                "#b70a0a",
                "#2e238c",
                "#e69c15",
                "#293326"
            ],
            numMapsIdle = 0,
            numMapTilesLoaded = 0,
            numDirectionsLoaded = 0,
            translatingComplete = true;

        /**
         * A single DirectionsService is enough to get multiple directions, but multiple
         * DirectionRenderers are required (one for each set).
         */
        var directionRenderers = [];
        var directionsService;

        /**
         * Loads the map view.
         */
        var loadMapView = function ($mapCanvas) {
            // do not initialize till google apis are available.
            if (!utils.isGoogleMapsApiAvailable()) {
                window.console.log("map api not available");
                return false;
            }

            // add map control
            var mapOptions = {
                center: new window.google.maps.LatLng(0, 0),
                zoomControl: false,
                mapTypeId: window.google.maps.MapTypeId.ROADMAP,
                scaleControl: false,
                draggable: false,
                scrollwheel: false,
                mapTypeControl: false,
                fullscreenControl: false,
                streetViewControl: false
            };
            return new window.google.maps.Map($mapCanvas[0], mapOptions);
        };

        /**
         * Generates Legend Key for a given index,
         * A, ..., Z, AA, AB, ..., BA, ... ZZ, AAA, ...
         *
         * @param {type} index - input index (zero based)
         * @returns {String} - Generated legend key.
         */
        var generateLegendKey = function (index) {
            var key = "";
            var qot = index;
            do {
                var mod = qot % 26;
                qot = Math.floor(qot / 26);
                key = String.fromCharCode(mod + 65) + key;
                qot = qot - 1;
            } while (qot >= 0);
            return key;
        };

        /**
         * Initializes the legend keys. (sets appropriate colors and alphabets/numbers)
         */
        var initializeLegend = function () {
            var mapSidebar = $(".stay-maps .map-legend");

            // set colors for attractions within the destinations.
            mapSidebar.find(".legend-day-list").each(function () {
                var index = 0;
                $(this).find(".legendOption").each(function (i) {
                    var color = markerColors[i % markerColors.length];
                    var css = "<style>@media screen, print { #" + $(this).attr("id") + " .map-marker .bg { border-color: " + color + ";}}</style>";
                    $("body").append(css);
                    $(this).find("li").each(function () {
                        var label = generateLegendKey(index);
                        $(this).data("markerLabel", label);
                        var $mapMarker = $(this).find(".map-marker");
                        $mapMarker.append(label);
                        index += 1;
                    });
                });
            });
        };

        /**
         * Generates Legend Key for a given index,
         * A, ..., Z, AA, AB, ..., BA, ... ZZ, AAA, ...
         *
         * @param {type} index - input index (zero based)
         * @returns {String} - Generated legend key.
         */
        var generateLegendKey = function (index) {
            var key = "";
            var qot = index;
            do {
                var mod = qot % 26;
                qot = Math.floor(qot / 26);
                key = String.fromCharCode(mod + 65) + key;
                qot = qot - 1;
            } while (qot >= 0);
            return key;
        };

        /**
         * Returns the points to be displayed for the specified legend.
         *
         * @param {type} legendIdPrefix - id of the legend for which the points are required.
         *
         * @returns {Array} - array of points {"lat":aa, "lng":bb, "label":cc, "color":dd}
         */
        var getPoints = function (legendIdPrefix) {
            var result = [];
            // select legend options
            var $legendOptions = $("*[id^='" + legendIdPrefix + "']");
            $legendOptions.each(function (i) {
                // get mapPoints
                var dataHolder = $(this);

                var label, colorIndex, color, routeColor;
                // different label & color depending on list type.
                label = dataHolder.data("markerLabel");
                colorIndex = 5;
                color = "#000000";
                routeColor = "#000000";

                result.push({
                    lat: dataHolder.data("lat"),
                    lng: dataHolder.data("lng"),
                    label: label,
                    color: color,
                    colorIndex: colorIndex,
                    routeColor: routeColor,
                    legendOption: legendIdPrefix,
                    title: dataHolder.find(".name").text()
                });
            });

            if (!result.length && $legendOptions.length) {
                var $stayList = $legendOptions.first().parent("ol.legend-day-list");
                result.push({
                    lat: $stayList.data("lat"),
                    lng: $stayList.data("lng"),
                    label: undefined,
                    color: undefined,
                    routeColor: undefined,
                    legendOption: undefined,
                    title: undefined
                });
            }
            return result;
        };

        /**
         * Returns the google maps directions request.
         *
         * @param {Array} points array of points {"lat":aa, "lng":bb}
         *
         * @returns {google.maps.DirectionsRequest} - object containing information about the directions request.
         */
        var getMapOptionForDirections = function (points) {
            var result = {};
            var numPoints = points.length;
            var wayPoints = [];
            var i = 0;

            result.origin = new window.google.maps.LatLng(points[0].lat, points[0].lng);
            result.destination = new window.google.maps.LatLng(points[numPoints - 1].lat, points[numPoints - 1].lng);
            result.travelMode = window.google.maps.DirectionsTravelMode.DRIVING;

            for (i = 1; i < numPoints - 1; i++) {
                wayPoints.push({
                    location: new window.google.maps.LatLng(points[i].lat, points[i].lng)
                });
            }
            result.waypoints = wayPoints;

            return result;
        };

        var renderDirections = function (map, directions, color) {
            // suppress markers since we will be adding our own custom overlays instead.
            // suppress autozoom/autocenter (preserveViewport) since we may have multiple renderers
            // working at a time and bounds will be updated elsewhere.
            var directionsRenderer = new window.google.maps.DirectionsRenderer({
                suppressMarkers: true,
                polylineOptions: {strokeColor: color, strokeOpacity: 0.57, strokeWeight: 4},
                preserveViewport: true
            });
            directionsRenderer.setMap(map);
            directionsRenderer.setDirections(directions);
            directionRenderers.push(directionsRenderer);
        };

        /**
         * Requests route for the points using google's api and then renders it.
         *
         * @param {Array} points - points containing lat/lng data
         * @param {String} color - color to render the directions
         */
        var routeAndDisplayDirections = function (id, points, color, map, directionsService) {
            if (points.length > 1) {
                // render a route for the points
                var mapOption = getMapOptionForDirections(points);

                // first check for directions in cache
                if (directionsCache.hasOwnProperty(id)) {
                    renderDirections(map, directionsCache[id], color);
                } else {
                    directionsService.route(mapOption, function (result, status) {
                        if (status === 'OK') {
                            renderDirections(map, result, color);
                            directionsCache[id] = result;
                            numDirectionsLoaded++;
                            checkAndPrint();
                        } else if (status === 'OVER_QUERY_LIMIT') {
                            window.setTimeout(function () {
                                routeAndDisplayDirections(id, points, color, map, directionsService);
                            }, 500);
                        } else {
                            numDirectionsLoaded++;
                            checkAndPrint();
                        }
                    });
                }
            }
        };

        /**
         * Adds directions to the map.
         */
        var addMapDirections = function (googleMap, points) {
            if (points.length > 1) {
                // depending on the user's selection we might have to display one or more
                // sets of directions at the same time.
                // (1) for 'all destinations' view, a single legend option is selected and
                //     a single direction will be rendered
                // (2) for 'all paris attractions' view, multiple legend options are selected
                //     and thus multiple directiosn will be rendered
                // (3) for 'paris day 1' view, a single legend option is selected and
                //     a single direction will be rendered
                var prevPointData;
                mapBounds = new window.google.maps.LatLngBounds();
                var pointsCluster = [];
                var numDirections = 0;
                var i = 0;

                for (i = 0; i < points.length; i++) {
                    var pointData = points[i];
                    var gmapPoint = new window.google.maps.LatLng(pointData.lat, pointData.lng);
                    mapBounds.extend(gmapPoint);

                    if (prevPointData !== undefined && pointData.legendOption !== prevPointData.legendOption) {
                        // legend option has changed, so display currently collected points cluster
                        if (pointsCluster.length > 0) {
                            routeAndDisplayDirections(prevPointData.legendOption, pointsCluster, prevPointData.routeColor, googleMap, directionsService);
                            numDirections += 1;
                        }
                        pointsCluster = [];
                    }
                    pointsCluster.push(pointData);
                    prevPointData = pointData;
                }

                // if this is the last set of points, then choose appropriate color
                // if this is the only set of points, then choose black
                var color = pointsCluster[0].routeColor;

                // display the only/last set of points
                routeAndDisplayDirections(pointsCluster[0].legendOption, pointsCluster, color, googleMap, directionsService);

                // update map bounds to include all points
                googleMap.fitBounds(mapBounds);
            } else {
                numDirectionsLoaded += 1;
            }
        };

        /**
         * Displays only markers on the map.
         */
        var showMapMarkers = function (googleMap, points) {
            var mapPosition;

            // special case if only 1 point that too a placeholder one for when there are real points.
            if (points.length === 1 && points[0].title === undefined) {
                mapBounds = new window.google.maps.LatLngBounds();
                mapPosition = new window.google.maps.LatLng(points[0].lat, points[0].lng);
                mapBounds.extend(mapPosition);
                googleMap.setCenter(mapBounds.getCenter());
                googleMap.setZoom(10);
                return;
            }

            // add points and compute bounds
            mapBounds = new window.google.maps.LatLngBounds();
            var i = 0;
            for (i = 0; i < points.length; i++) {
                var pointData = points[i];
                mapPosition = new window.google.maps.LatLng(pointData.lat, pointData.lng);

                // create overlay
                var overlay = new window.LabelMapMarker(pointData.label, pointData.colorIndex, mapPosition, googleMap, instance);
                overlay.setMap(googleMap);

                mapBounds.extend(mapPosition);
            }

            // calculate the center / bounds of the map view
            if (points.length === 1) {
                googleMap.setCenter(mapBounds.getCenter());
                googleMap.setZoom(10);
            } else {
                googleMap.fitBounds(mapBounds);
            }
        };

        /**
         * Displays the map view for the specified legend id.
         *
         * @param {String} id
         * @param {String} destination
         */
        var showMapViewForDestination = function ($mapCanvas, id, showDirections, defaultLatLng) {
            var points = getPoints(id);
            if (!points.length) {
                points.push(defaultLatLng);
                $mapCanvas.hide();
                return;
            }
            var googleMap = loadMapView($mapCanvas);
            if (showDirections) {
                addMapDirections(googleMap, points);
            } else {
                numDirectionsLoaded += 1;
            }
            showMapMarkers(googleMap, points);
            googleMaps.push(googleMap);
        };

        /**
         * Displays map for specified stayId.
         *
         */
        var gotoMapStay = function () {
            var $mapLegend = $(".map-legend");
            $mapLegend.each(function () {
                var $a = $(this),
                    mapTarget = $a.data("idPrefix"),
                    mapCanvasId = $a.data("mapId"),
                    showDirections = $a.data("showDirections"),
                    defaultLat = $a.data("defaultLat"),
                    defaultLng = $a.data("defaultLng");
                showMapViewForDestination($("#" + mapCanvasId), mapTarget, showDirections, {
                    lat: defaultLat,
                    lng: defaultLng
                });
            });
        };

        var gotoMapStayForVisits = function () {
            var $mapHolder = $(".day").find(".map-holder");
            $mapHolder.each(function () {
                var $holder = $(this),
                    mapTarget = $holder.data("idPrefix"),
                    mapCanvasId = $holder.attr("id"),
                    defaultLat = $holder.data("defaultLat"),
                    defaultLng = $holder.data("defaultLng");
                showMapViewForDestination($("#" + mapCanvasId), mapTarget, true, {lat: defaultLat, lng: defaultLng});
            });
        };

        function checkAndPrint() {
            var numGoogleMaps = googleMaps.length;
            if (numMapsIdle === numGoogleMaps && numMapTilesLoaded === numGoogleMaps && numDirectionsLoaded === numGoogleMaps && translatingComplete) {
                window.setTimeout(function () {
                    window.print();
                }, 100);
            }
        }

        var setup = function () {
            directionsService = new window.google.maps.DirectionsService();

            //initializeLegend();
            gotoMapStay();
            gotoMapStayForVisits();
            var numGoogleMaps = googleMaps.length,
                i;

            function onMapIdle() {
                numMapsIdle += 1;
                checkAndPrint();
            }

            function onMapTilesLoaded() {
                numMapTilesLoaded += 1;
                checkAndPrint();
            }

            for (i = 0; i < numGoogleMaps; i++) {
                window.google.maps.event.addListener(googleMaps[i], "idle", onMapIdle);
                window.google.maps.event.addListener(googleMaps[i], "tilesloaded", onMapTilesLoaded);
            }
        };

        /**
         * Performs required operations once maps api is loaded.
         */
        window.onGoogleMapsApiLoaded = function () {
            var i = 0;
            /**
             * LabelMapMarker is a subclass of google.maps.OverlayView and is used to display
             * markers on the map.
             *
             * @param {String} label - label of the marker
             * @param {String} color - marker background color
             * @param {google.maps.LatLng} mapPosition - position for the marker
             * @param {google.maps.Map} map - the map object for displaying the infoWindow
             * @param {type} controller - controller that hides/shows info window
             */
            window.LabelMapMarker = function (label, markerIconIndex, mapPosition, map, controller) {
                // create a div/span for the marker and make the marker look the way we want it (like in the legend)
                var $marker = $(document.createElement("span"))
                    .css({position: "absolute"})
                    .addClass("map-marker notranslate");
                var html = '<span class="circle"></span><span class="text notranslate">' + label + '</span>';
                html += '<svg class="map-marker-icon in-plan"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-new-map-marker"></use></svg>';
                $marker.html(html);

                this.span_ = $marker[0];
                this.position_ = mapPosition;
                this.map_ = map;
                this.controller_ = controller;
            };

            // LabelMapMarker 'is-a' OverlayView.
            window.LabelMapMarker.prototype = new window.google.maps.OverlayView();

            // Adding methods to the prototype instead of the object since we are going to have
            // several instances of LabelMapMarker.
            window.LabelMapMarker.prototype.onAdd = function () {
                var pane = this.getPanes().overlayMouseTarget;
                pane.appendChild(this.span_);
            };

            // Adding methods to the prototype instead of the object since we are going to have
            // several instances of LabelMapMarker.
            window.LabelMapMarker.prototype.onRemove = function () {
                this.span_.parentNode.removeChild(this.span_);

                var i = 0;
                for (i = 0; i < this.listeners_.length; i++) {
                    window.google.maps.event.removeListener(this.listeners_[i]);
                }
            };

            // Adding methods to the prototype instead of the object since we are going to have
            // several instances of LabelMapMarker.
            window.LabelMapMarker.prototype.draw = function () {
                var projection = this.getProjection();
                var position = projection.fromLatLngToDivPixel(this.position_);

                var span = this.span_;
                span.style.left = (position.x - $(span).outerWidth() / 2) + 'px';
                span.style.top = (position.y - $(span).outerHeight() + 5) + 'px'; // 5 is for the radius of the small circle at the bottom of the map pin
                span.style.display = 'block';
            };

            setup();
        };

        function startTranslating() {
            var $overlay = $('.overlay'),
                $overlayText = $overlay.find('div'),
                $window = $(window),
                documentHeight = $(document).height(),
                windowHeight = $window.height(),
                numPages = Math.ceil(documentHeight / windowHeight),
                pagesScrolled = 0,
                scrollTop = 0;

            function scrollDown() {
                scrollTop += windowHeight;
                pagesScrolled++;
                if (scrollTop >= documentHeight) {
                    window.setTimeout(function () {
                        translatingComplete = true;
                        $window.scrollTop(0);
                        $overlay.addClass('hidden');
                        $('body').removeClass('translating');
                        checkAndPrint();
                    }, 100);
                    return;
                }
                $overlayText.find('.percentage').text(Math.ceil((pagesScrolled / numPages) * 100));
                $overlayText.animate({'top': scrollTop + 140}, 1);
                $("html").animate({scrollTop: scrollTop}, 1, function () {
                    scrollDown();
                });
            }

            window.setTimeout(function () {
                scrollDown();
            }, 1);
        }

        function setLanguage(languageCode) {
            if (!languageCode || languageCode === "en") {
                return;
            }

            function triggerHtmlEvent(element, eventName) {
                var event;
                if (document.createEvent) {
                    event = document.createEvent('HTMLEvents');
                    event.initEvent(eventName, true, true);
                    element.dispatchEvent(event);
                } else if (document.createEventObject) {
                    event = document.createEventObject();
                    event.eventType = eventName;
                    element.fireEvent('on' + event.eventType, event);
                }
            }


            // set value and trigger change
            var $languageSelect = $('#google_translate_element').find('select.goog-te-combo');
            if ($languageSelect.length) { // may not exist yet when called on page load
                $languageSelect.val(languageCode);
                triggerHtmlEvent($languageSelect[0], 'change');
            }
        }

        function viewDetails() {
            var $details = $(this),
                $dataHolder = $details.parents(".reservation-wrapper").find(".reservation"),
                reservationId = $dataHolder.data('reservationId'),
                isManual = $dataHolder.data("isManual");

            if (!isManual) {
                window.open("/trip/" + $(".page-wrapper").data("planId") + "/reservation/" + reservationId + "/details", '_blank');

            } else {
                var url = "/trip/" + $(".page-wrapper").data("planId") + "/reservation/print/" + reservationId;
                window.open(url, '_blank');
            }
        }

        function viewAttachment() {
            if ($(this).data('attachmentId')) {
                var planId = $(".page-wrapper").data("planId");
                window.open("/trip/" + planId + "/attachment/" + $(this).data('attachmentId'), "_blank");
            }
        }

        /**
         * Initializes the print controller.
         */
        instance.initialize = function () {
            var $planHeading = $.find(".plan-heading");
            var type = $($planHeading).data("type");
            var lang = utils.getCookie("language");
            var $day = $(".day");
            if (lang && lang !== 'en') {
                setLanguage(lang);
                translatingComplete = false;
                $('.overlay').removeClass('hidden');
                $('body').addClass('translating');
                if (document.readyState === "complete") {
                    $(window).scrollTop(0);
                    startTranslating();
                } else {
                    $(window).on("load", function () {
                        $(window).scrollTop(0);
                        startTranslating();
                    });
                }


            }
            if (type === "all") {
                $.getScript("https://maps.googleapis.com/maps/api/js?sensor=false&callback=window.onGoogleMapsApiLoaded&key=" + window.gmapsApiKey);
            } else {
                checkAndPrint();
            }

            $day.find(".view-details").off("click.view-details").on("click.view-details", viewDetails);
            $day.find(".attachment-link").off("click.attachment-link").on("click.attachment-link", viewAttachment);
        };

        instance.initialize();
        return instance;
    });
