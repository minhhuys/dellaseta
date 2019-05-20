var Home = {
    dataBanner: [],
    dataCategory: [],

    initHome: function () {
        var searchParams = {
            index: 'categories',
            type: 'category',
            from: 0,
            size: 1000,
            body: {
                query: {
                    bool: {
                        "must": [
                            {
                                query_string: {
                                    default_field: "merchantId",
                                    query: Configuration.merchantId
                                }
                            },
                            {
                                "match": { "languageId": Configuration.currentLanguage }
                            },
                            {
                                "match": { "type": 32 }
                            }
                        ]
                    }
                }
            }
        };
        client.search(searchParams, function (err, data) {
            $.each(data.hits.hits, function (i, value) {
                if (value._source.displayOrder === ConfigHome.home1) {
                    var temId = value._source.relationIds.toString();
                    var searchBanner = {
                        index: 'articles',
                        type: 'article2',
                        from: 0,
                        size: 1000,
                        body: {
                            query: {
                                bool: {
                                    "must": [
                                        {
                                            query_string: {
                                                default_field: "merchantId",
                                                query: Configuration.merchantId
                                            }
                                        },
                                        {
                                            "match": { "languageId": Configuration.currentLanguage }
                                        },
                                        {
                                            "match": { "id": temId }
                                        }
                                    ]
                                }
                            }
                        }
                    };
                    client.search(searchBanner, function (err, data) {
                        $.each(data.hits.hits, function (i, val) {
                            Home.dataBanner.push(val._source);
                        });
                        var dataSort = [];
                        value._source.relationIds.forEach(vl => {
                            dataSort.push(Home.dataBanner.find(e => e.id === vl));
                        });
                        dataSort.forEach((vl, i) => {
                            $('#bannerHome').append(Home.buildBannerHome(vl, i));
                        });
                        var tpj = jQuery;
                        var revapi486;
                        tpj(document).ready(function () {
                            if (tpj("#rev_slider_one").revolution == undefined) {
                                revslider_showDoubleJqueryError("#rev_slider_one");
                            } else {
                                revapi486 = tpj("#rev_slider_one").show().revolution({
                                    sliderType: "standard",
                                    jsFileLocation: "plugins/revolution/js/",
                                    sliderLayout: "fullwidth",
                                    dottedOverlay: "yes",
                                    delay: 1000000000000000000000000000000000000000000000000000000000000,
                                    navigation: {
                                        keyboardNavigation: "off",
                                        keyboard_direction: "horizontal",
                                        mouseScrollNavigation: "off",
                                        mouseScrollReverse: "default",
                                        onHoverStop: "off",
                                        touch: {
                                            touchenabled: "on",
                                            touchOnDesktop: "off",
                                            swipe_threshold: 75,
                                            swipe_min_touches: 1,
                                            swipe_direction: "horizontal",
                                            drag_block_vertical: false
                                        },
                                        arrows: {
                                            style: "hermes",
                                            enable: true,
                                            hide_onmobile: true,
                                            hide_under: 600,
                                            hide_onleave: false,
                                            tmp: '',
                                            left: {
                                                h_align: "left",
                                                v_align: "center",
                                                h_offset: 15,
                                                v_offset: 0
                                            },
                                            right: {
                                                h_align: "right",
                                                v_align: "center",
                                                h_offset: 15,
                                                v_offset: 0
                                            }
                                        }

                                    },
                                    responsiveLevels: [1200, 1040, 778, 480],
                                    visibilityLevels: [1200, 1040, 778, 480],
                                    gridwidth: [1200, 1040, 778, 480],
                                    gridheight: [850, 600, 500, 400],
                                    lazyType: "none",
                                    parallax: {
                                        type: "scroll",
                                        origo: "enterpoint",
                                        speed: 400,
                                        levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 46, 47, 48, 49, 50, 55],
                                        type: "scroll",
                                    },
                                    shadow: 0,
                                    spinner: "off",
                                    stopLoop: "off",
                                    stopAfterLoops: -1,
                                    stopAtSlide: -1,
                                    shuffle: "off",
                                    autoHeight: "off",
                                    hideThumbsOnMobile: "off",
                                    hideSliderAtLimit: 0,
                                    hideCaptionAtLimit: 0,
                                    hideAllCaptionAtLilmit: 0,
                                    debugMode: false,
                                    fallbacks: {
                                        simplifyAll: "off",
                                        nextSlideOnWindowFocus: "off",
                                        disableFocusListener: false,
                                    }
                                });
                            }



                            if (tpj("#rev_slider_four").revolution == undefined) {
                                revslider_showDoubleJqueryError("#rev_slider_four");
                            } else {
                                revapi486 = tpj("#rev_slider_four").show().revolution({
                                    sliderType: "standard",
                                    jsFileLocation: "plugins/revolution/js/",
                                    sliderLayout: "auto",
                                    dottedOverlay: "none",
                                    delay: 1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000,
                                    navigation: {
                                        keyboardNavigation: "off",
                                        keyboard_direction: "horizontal",
                                        mouseScrollNavigation: "off",
                                        mouseScrollReverse: "default",
                                        onHoverStop: "off",
                                        touch: {
                                            touchenabled: "on",
                                            touchOnDesktop: "off",
                                            swipe_threshold: 75,
                                            swipe_min_touches: 1,
                                            swipe_direction: "horizontal",
                                            drag_block_vertical: false
                                        },
                                        arrows: {
                                            style: "metis",
                                            enable: true,
                                            hide_onmobile: true,
                                            hide_under: 600,
                                            hide_onleave: false,
                                            tmp: '',
                                            left: {
                                                h_align: "left",
                                                v_align: "center",
                                                h_offset: 0,
                                                v_offset: 0
                                            },
                                            right: {
                                                h_align: "right",
                                                v_align: "center",
                                                h_offset: 0,
                                                v_offset: 0
                                            }
                                        }

                                    },
                                    responsiveLevels: [1200, 1040, 778, 600],
                                    visibilityLevels: [1200, 1040, 778, 600],
                                    gridwidth: [1200, 1040, 778, 600],
                                    gridheight: [750, 640, 600, 420],
                                    lazyType: "none",
                                    parallax: {
                                        type: "scroll",
                                        origo: "enterpoint",
                                        speed: 400,
                                        levels: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 46, 47, 48, 49, 50, 55],
                                        type: "scroll",
                                    },
                                    shadow: 0,
                                    spinner: "off",
                                    stopLoop: "off",
                                    stopAfterLoops: -1,
                                    stopAtSlide: -1,
                                    shuffle: "off",
                                    autoHeight: "off",
                                    hideThumbsOnMobile: "off",
                                    hideSliderAtLimit: 0,
                                    hideCaptionAtLimit: 0,
                                    hideAllCaptionAtLilmit: 0,
                                    debugMode: false,
                                    fallbacks: {
                                        simplifyAll: "off",
                                        nextSlideOnWindowFocus: "off",
                                        disableFocusListener: false,
                                    }
                                });
                            }
                        });
                    });
                };
                if (value._source.displayOrder === ConfigHome.home2) {
                    $('#section_home2').append(Home.buildHome2(value._source));
                };
                if (value._source.displayOrder === ConfigHome.home3) {
                    var temId1 = value._source.relationIds.toString();
                    var searchHome3 = {
                        index: 'dishs',
                        type: 'dish',
                        from: 0,
                        size: 100,
                        body: {
                            query: {
                                bool: {
                                    "must": [
                                        {
                                            query_string: {
                                                default_field: "merchantId",
                                                query: Configuration.merchantId
                                            }
                                        },
                                        {
                                            "match": { "languageId": Configuration.currentLanguage }
                                        },
                                        {
                                            "match": { "id": temId1 }
                                        }
                                    ]
                                }
                            }
                        }
                    };
                    client.search(searchHome3, function (err, data) {
                        $.each(data.hits.hits, function (i, val) {
                            if (i === 0) {
                                $('#section_home3 .section_item1').append(Home.buildHome3(val._source));
                            } else {
                                $('#section_home3 .section_item2').append(Home.buildHome3(val._source));
                            }
                        });
                    });
                };
                if (value._source.displayOrder === ConfigHome.home4) {
                    $('#section_home4 .sec-title .title').html(value._source.description);
                    $('#section_home4 .sec-title h2').html(value._source.name);
                    var temId2 = value._source.relationIds.toString();
                    var searchHome3 = {
                        index: 'dishs',
                        type: 'dish',
                        from: 0,
                        size: 100,
                        body: {
                            query: {
                                bool: {
                                    "must": [
                                        {
                                            query_string: {
                                                default_field: "merchantId",
                                                query: Configuration.merchantId
                                            }
                                        },
                                        {
                                            "match": { "languageId": Configuration.currentLanguage }
                                        },
                                        {
                                            "match": { "id": temId2 }
                                        }
                                    ]
                                }
                            }
                        }
                    };
                    client.search(searchHome3, function (err, data) {
                        $.each(data.hits.hits, function (i, val) {
                            $('#section_home4 .row').append(Home.buildHome4(val._source));
                        });
                    });
                };
                if (value._source.displayOrder === ConfigHome.home5) {
                    $('#section_home5 h2').html(value._source.name);
                    value._source.images.forEach(vl => {
                        var imgUrl = Configuration.imageRoot + vl.path;
                        $('#section_home5').attr('style', 'background-image:url(' + imgUrl + ')')
                    });
                };
                if (value._source.displayOrder === ConfigHome.home6) {
                    value._source.images.forEach(vl => {
                        var imgUrl = Configuration.imageRoot + vl.path;
                        $('#section_home6').attr('style', 'background-image:url(' + imgUrl + ')')
                    });
                    var temId3 = value._source.relationIds.toString();
                    var searchHome6 = {
                        index: 'articles',
                        type: 'article2',
                        from: 0,
                        size: 100,
                        body: {
                            query: {
                                bool: {
                                    "must": [
                                        {
                                            query_string: {
                                                default_field: "merchantId",
                                                query: Configuration.merchantId
                                            }
                                        },
                                        {
                                            "match": { "languageId": Configuration.currentLanguage }
                                        },
                                        {
                                            "match": { "id": temId3 }
                                        }
                                    ]
                                }
                            }
                        }
                    };
                    client.search(searchHome6, function (err, data) {
                        $.each(data.hits.hits, function (i, val) {
                            $('#section_home6 .single-item-carousel').append(Home.buildHome6(val._source));
                        });
                        var single_item_carousel = $('.single-item-carousel');
                        if (single_item_carousel.length) {
                            single_item_carousel.owlCarousel({
                                loop: true,
                                margin: 10,
                                nav: true,
                                smartSpeed: 1000,
                                autoplay: 5000,
                                navText: ['<span class="ion-ios-arrow-thin-left"></span>', '<span class="ion-ios-arrow-thin-right"></span>'],
                                responsive: {
                                    0: {
                                        items: 1
                                    },
                                    600: {
                                        items: 1
                                    },
                                    1200: {
                                        items: 1
                                    }
                                }
                            });
                        }
                    });
                };
                if (value._source.displayOrder === ConfigHome.home7) {
                    $('#section_home7').append(Home.buildHome7(value._source));
                };
            });
        });
    },

    buildHome7(data) {
        var build = '';
        build += '<div class="auto-container">';
        build += '      <div class="title">Buy a Gift</div>';
        build += '      <h2>' + data.name + '</h2>';
        build += '      <div class="text">' + data.description + '</div>';
        build += '      <a href="#" class="theme-btn btn-style-two">Order The Gift</a>';
        build += '</div>';
        return build;
    },

    buildHome6(data) {
        var build = '';
        build += '<div class="testimonial-block">';
        build += '      <div class="inner-box">';
        build += '            <div class="text">' + data.subDescription + '</div>';
        build += '            <div class="author">' + data.name + '</div>';
        build += '      </div>';
        build += '</div>';
        return build;
    },

    buildHome4(data) {
        var build = "";
        build += '<div class="menu-block col-md-4 col-sm-6 col-xs-12">';
        build += '      <div class="inner-box">';
        build += '            <div style="position: relative;" class="info clearfix">';
        build += '                  <div style="padding-right: 100px;" class="pull-left">';
        build += '                        <h3><a href="shop-single.html">' + data.name + '</a></h3>';
        build += '                  </div>';
        build += '                  <div style="position:absolute;top:0;right:-2px;" class="pull-right">';
        build += '                        <div class="price">$' + data.price + '</div>';
        build += '                  </div>';
        build += '            </div>';
        build += '            <div class="text">' + data.subDescription + '</div>';
        build += '      </div>';
        build += '</div>';
        return build;
    },

    buildHome3(data) {
        var build = "";
        var imgUrl = '';
        data.images.forEach(vl => {
            imgUrl = Configuration.imageRoot + vl.path;
        });
        build += '<div class="gallery-block">';
        build += '      <div class="inner-box">';
        build += '            <div class="image">';
        build += '                  <img src="' + imgUrl + '" alt="">';
        build += '                  <a href="#0" class="overlay-layer"></a>';
        build += '                  <div class="content">';
        build += '                        <div class="text"><a href="shop-single.html">' + data.name + '</a></div>';
        build += '                  </div>';
        build += '            </div>';
        build += '      </div>';
        build += '</div>';
        return build;
    },

    buildHome2(data) {
        var build = '';
        build += '<div class="sec-title centered">';
        build += '      <h2>' + data.name + '</h2>';
        build += '</div>';
        build += '<div class="content">';
        build += '      <div class="text">' + data.description + '</div>';
        build += '</div>';
        return build;
    },

    buildBannerHome(data, index) {
        var build = '';
        var imgUrl = '';
        data.images.forEach(vl => {
            if (vl.isFeatured === true) {
                imgUrl = Configuration.imageRoot + vl.path;
            }
        });
        build += '<li data-description="Slide Description" data-easein="default" data-easeout="default" data-fsmasterspeed="1500" data-fsslotamount="7" data-fstransition="fade" data-hideafterloop="0" data-hideslideonmobile="off" data-index="rs-' + index + '" data-masterspeed="default" data-param1="" data-param10="" data-param2="" data-param3="" data-param4="" data-param5="" data-param6="" data-param7="" data-param8="" data-param9="" data-rotate="0" data-saveperformance="off" data-slotamount="default" data-title="Slide Title" data-transition="parallaxvertical">';
        build += '      <img alt="" class="rev-slidebg" data-bgfit="cover" data-bgparallax="10" data-bgposition="center center" data-bgrepeat="no-repeat" data-no-retina="" src="' + imgUrl + '">';
        build += '      <div class="tp-caption tp-resizeme" data-paddingbottom="[0,0,0,0]" data-paddingleft="[0,0,0,0]" data-paddingright="[0,0,0,0]" data-paddingtop="[0,0,0,0]" data-responsive_offset="on" data-type="text" data-height="none" data-whitespace="nowrap" data-width="none" data-hoffset="[\'0\',\'0\',\'0\',\'0\']" data-voffset="[\'-20\',\'90\',\'65\',\'60\']" data-x="[\'center\',\'center\',\'center\',\'center\']" data-y="[\'middle\',\'middle\',\'middle\',\'middle\']" data-textalign="[\'top\',\'top\',\'top\',\'top\']" data-frames="[{&quot;from&quot;:&quot;x:[-100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;&quot;,&quot;mask&quot;:&quot;x:0px;y:0px;s:inherit;e:inherit;&quot;,&quot;speed&quot;:1500,&quot;to&quot;:&quot;o:1;&quot;,&quot;delay&quot;:1000,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:1000,&quot;to&quot;:&quot;auto:auto;&quot;,&quot;mask&quot;:&quot;x:0;y:0;s:inherit;e:inherit;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]" style="z-index: 7; white-space: nowrap;text-transform:left;">';
        build += '            <div class="text">' + data.subDescription + '</div>';
        build += '      </div>';
        build += '      <div class="tp-caption" data-paddingbottom="[0,0,0,0]" data-paddingleft="[0,0,0,0]" data-paddingright="[0,0,0,0]" data-paddingtop="[0,0,0,0]" data-responsive_offset="on" data-type="text" data-height="none" data-width="[\'800\',\'800\',\'800\',\'420\']" data-whitespace="normal" data-hoffset="[\'0\',\'0\',\'0\',\'0\']" data-voffset="[\'40\',\' - 10\',\'10\',\'0\']" data-x="[\'center\',\'center\',\'center\',\'center\']" data-y="[\'middle\',\'middle\',\'middle\',\'middle\']" data-textalign="[\'top\',\'top\',\'top\',\'top\']" data-frames="[{&quot;from&quot;:&quot;y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;&quot;,&quot;mask&quot;:&quot;x:0px;y:0px;s:inherit;e:inherit;&quot;,&quot;speed&quot;:1500,&quot;to&quot;:&quot;o:1;&quot;,&quot;delay&quot;:1000,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:1000,&quot;to&quot;:&quot;auto:auto;&quot;,&quot;mask&quot;:&quot;x:0;y:0;s:inherit;e:inherit;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]" style="z-index: 7; white-space: nowrap;text-transform:left;">';
        build += '            <h2 class="text-center">' + data.name + '</h2>';
        build += '      </div>';
        build += '      <div class="tp-caption tp-resizeme" data-paddingbottom="[0,0,0,0]" data-paddingleft="[0,0,0,0]" data-paddingright="[0,0,0,0]" data-paddingtop="[0,0,0,0]" data-responsive_offset="on" data-type="text" data-height="none" data-width="[\'600\',\'600\',\'400\',\'360\']" data-whitespace="normal" data-hoffset="[\'0\',\'0\',\'0\',\'0\']" data-voffset="[\'120\',\'85\',\'100\',\'55\']" data-x="[\'center\',\'center\',\'center\',\'center\']" data-y="[\'middle\',\'middle\',\'middle\',\'middle\']" data-textalign="[\'top\',\'top\',\'top\',\'top\']" data-frames="[{&quot;from&quot;:&quot;y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;&quot;,&quot;mask&quot;:&quot;x:0px;y:0px;s:inherit;e:inherit;&quot;,&quot;speed&quot;:1500,&quot;to&quot;:&quot;o:1;&quot;,&quot;delay&quot;:1000,&quot;ease&quot;:&quot;Power3.easeInOut&quot;},{&quot;delay&quot;:&quot;wait&quot;,&quot;speed&quot;:1000,&quot;to&quot;:&quot;auto:auto;&quot;,&quot;mask&quot;:&quot;x:0;y:0;s:inherit;e:inherit;&quot;,&quot;ease&quot;:&quot;Power3.easeInOut&quot;}]" style="z-index: 7; white-space: nowrap;text-transform:left;">';
        build += '            <div class="location text-center">' + data.description + '</div>';
        build += '      </div>';
        build += '</li>';
        return build;
    },

};