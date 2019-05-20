const about_us = 'About us';
const contact = 'Liên hệ';

var About = {

    $formFeedback: $('#contact-form'),


    init() {
        var searchParams = {
            index: 'categories',
            type: 'category',
            from: 0,
            size: 100,
            body: {
                "_source": {
                    "includes": ["displayOrder", 'name', 'relationIds', 'images', 'id', 'description'],
                },
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
                                "match": { "type": 2 }
                            }
                        ]
                    }
                },
                "sort": [
                    { "displayOrder": { "order": "asc" } }
                ],
            }
        };
        client.search(searchParams, function (err, data) {
            var img = '';
            var dataCategory = [];
            var dataArticle = [];
            var tempCategoryId = '';
            $.each(data.hits.hits, function (index, value) {
                if (value._source.name === about_us) {
                    $.each(value._source.images, function (i, vl) {
                        img = Configuration.imageRoot + vl.path;
                    })
                    $('.page-title').attr('style', 'background-image: url(' + img + ')');
                    $('.page-title h2').text(value._source.description);
                } else {
                    dataCategory.push(value._source);
                    tempCategoryId += value._source.id.toString(' ') + ' ';
                }
            })
            var searchArticles = {
                index: 'articles',
                type: 'article2',
                from: 0,
                size: 100,
                body: {
                    // "_source": {
                    //     "includes": ['name', 'images', 'description', 'subDescription'],
                    // },
                    query: {
                        bool: {
                            "must": [
                                {
                                    "match": { "languageId": Configuration.currentLanguage }
                                },
                                {
                                    query_string: {
                                        default_field: "categoryIds",
                                        query: tempCategoryId
                                    }
                                }
                            ]
                        }
                    }
                }
            };
            client.search(searchArticles, function (error, dataArticles) {
                $.each(dataArticles.hits.hits, function (index, value) {
                    dataArticle.push(value._source);
                })

                $.each(dataCategory, function (index, value) {

                    if (value.displayOrder === 1) {
                        $.each(value.relationIds, function (i, vl) {
                            var temp = dataArticle.find(e => e.id === vl);
                            $('.table-section .auto-container').append(About.buildSection1(temp));
                        })
                    }

                    if (value.displayOrder === 2) {
                        $('.carousel-section .auto-container .single-item-carousel').append(About.buildSection2(value));
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
                    }

                    if (value.displayOrder === 3) {
                        $('.unique-section h2').text(value.name);
                        $('.unique-section .text').html(value.description);
                    }

                    if (value.displayOrder === 4) {
                        $.each(value.relationIds, function (i, vl) {
                            var temp = dataArticle.find(e => e.id === vl)
                            $('.place-section .auto-container').append(About.buildSection4(temp));
                            $.each(temp.images, function (ind, val) {
                                $('.place-section').attr('style', 'background-image: url(' + Configuration.imageRoot + val.path + ')');
                            })
                        })
                    }

                    if (value.displayOrder === 5) {
                        $('.team-section h2').text(value.name);
                        $.each(value.relationIds, function (i, vl) {
                            var temp = dataArticle.find(e => e.id === vl)
                            $('.team-section .row').append(About.buildSection5(temp))
                        })
                    }
                })
            })
        })
    },

    initContact() {
        var searchParams = {
            index: 'categories',
            type: 'category',
            from: 0,
            size: 100,
            body: {
                "_source": {
                    "includes": ['name', 'images',],
                },
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
                                "match": { "type": 2 }
                            }
                        ]
                    }
                },
            }
        };
        client.search(searchParams, function (err, data) {

            var img = '';
            $.each(data.hits.hits, function (index, value) {
                if (value._source.name === contact) {
                    $('.page-title h2').text(value._source.name)
                    $.each(value._source.images, function (i, vl) {
                        img = Configuration.imageRoot + vl.path;
                    })
                    $('.page-title').attr('style', 'background-image: url(' + img + ')');
                }
            })

            var searchAddress = {
                index: 'addresses',
                type: 'addressrestaurant',
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
                                }
                            ]
                        }
                    }
                }
            }
            client.search(searchAddress, function (err, data) {
                var map = new google.maps.Map(document.getElementById('divMap'), {
                    styles: [
                        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
                        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
                        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
                        {
                            featureType: 'administrative.locality',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#d59563' }]
                        },
                        {
                            featureType: 'poi',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#d59563' }]
                        },
                        {
                            featureType: 'poi.park',
                            elementType: 'geometry',
                            stylers: [{ color: '#263c3f' }]
                        },
                        {
                            featureType: 'poi.park',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#6b9a76' }]
                        },
                        {
                            featureType: 'road',
                            elementType: 'geometry',
                            stylers: [{ color: '#38414e' }]
                        },
                        {
                            featureType: 'road',
                            elementType: 'geometry.stroke',
                            stylers: [{ color: '#212a37' }]
                        },
                        {
                            featureType: 'road',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#9ca5b3' }]
                        },
                        {
                            featureType: 'road.highway',
                            elementType: 'geometry',
                            stylers: [{ color: '#746855' }]
                        },
                        {
                            featureType: 'road.highway',
                            elementType: 'geometry.stroke',
                            stylers: [{ color: '#1f2835' }]
                        },
                        {
                            featureType: 'road.highway',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#f3d19c' }]
                        },
                        {
                            featureType: 'transit',
                            elementType: 'geometry',
                            stylers: [{ color: '#2f3948' }]
                        },
                        {
                            featureType: 'transit.station',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#d59563' }]
                        },
                        {
                            featureType: 'water',
                            elementType: 'geometry',
                            stylers: [{ color: '#17263c' }]
                        },
                        {
                            featureType: 'water',
                            elementType: 'labels.text.fill',
                            stylers: [{ color: '#515c6d' }]
                        },
                        {
                            featureType: 'water',
                            elementType: 'labels.text.stroke',
                            stylers: [{ color: '#17263c' }]
                        }
                    ]

                });
                var build = "<h2>Thông tin hữu ích</h2>";
                $.each(data.hits.hits, function (i, value) {
                    var myLatLng = { lat: value._source.latitude, lng: value._source.longitude };
                    if (i === 0) {
                        map.setZoom(16);
                        map.setCenter(myLatLng);
                    }
                    var marker = new google.maps.Marker({
                        position: myLatLng,
                        map: map,
                        title: value._source.name,
                        icon: "/images/icons/map-marker.png"
                    });
                });
            });
        })
    },

    submitFeedback() {
        if (!About.$formFeedback.valid()) {
            return;
        } else {
            var data = {
                name: $('#contact-form input[name="name"]').val(),
                email: $('#contact-form input[name="email"]').val(),
                content: $('#contact-form textarea[name="message"]').val(),
            }

            var mess = '<p><span style="font-weight: bold;">Feedback khách hàng</span></p><ol><li class="ms-hover">Họ tên : ' + data.name + '</li><li class="ms-hover">Email  : ' + data.email + '</li><li class="ms-hover">Nội dung : ' + data.content + '</li></ol>';

            var dataAjax = {
                MerchantId: Configuration.merchantId,
                From: "no-reply@foodizzi.com",
                FromName: "Della Seta",
                To: Configuration.email,
                ToName: "sample string 5",
                Subject: "Feedback của khách hàng",
                Body: mess,
            }

            $.ajax({
                url: Configuration.apiUrl + '/Email/Send',
                method: "POST",
                dataType: 'json',
                data: JSON.stringify(dataAjax),
                contentType: "application/json",
                processData: false,
                success: function (data) {
                    if (data.Success) {
                        alert('Gửi thông tin thành công !');
                        clearFormData($('#contact-form'));
                    }
                },
                error: function () {
                    alert('Error')
                }
            })
        }
    },

    buildSection1(data) {
        var build = '';
        var img_1 = '';
        var img_2 = '';
        $.each(data.images, function (index, value) {
            if (value.displayOrder === 1) {
                img_1 = Configuration.imageRoot + value.path + '?mode=Crop&width=280&height=420';
            } else {
                img_2 = Configuration.imageRoot + value.path + '?mode=Crop&width=280&height=420';
            }
        })
        build += '<div class="row clearfix">';
        build += '	<div class="image-column col-md-6 col-sm-12 col-xs-12">';
        build += '		<div class="row clearfix">';
        build += '			<div class="column col-md-6 col-sm-6 col-xs-6">';
        build += '				<div class="image">';
        build += '					<img src="' + img_1 + '" alt="" />';
        build += '				</div>';
        build += '			</div>';
        build += '			<div class="column col-md-6 col-sm-6 col-xs-6">';
        build += '				<div class="image">';
        build += '					<img src="' + img_2 + '" alt="" />';
        build += '				</div>';
        build += '			</div>';
        build += '		</div>';
        build += '	</div>';
        build += '	<div class="content-column col-md-6 col-sm-12 col-xs-12">';
        build += '		<div class="sec-title centered">';
        build += '			<div class="title">Always Delicious</div>';
        build += '			<h2>' + data.name + '</h2>';
        build += '		</div>';
        build += '		<div class="text" style="text-align: justify;">' + data.description + '</div>';
        // build += '		<div class="text-center">';
        // build += '			<a href="#" class="theme-btn btn-style-four">Find A Table</a>';
        // build += '		</div>';
        build += '	</div>';
        build += '</div>';
        return build;
    },

    buildSection2(data) {
        var build = ' ';
        var img = '';
        $.each(data.images, function (index, value) {
            img = Configuration.imageRoot + value.path;
            build += '	<div class="slide">';
            build += '		<img src="' + img + '?mode=Crop&width=1170&height=560' + '" alt="" />';
            build += '	</div>';
        })
        return build;
    },

    buildSection4(data) {
        var build = '';
        build += '<div class="row clearfix">';
        build += '	<div class="column col-md-6 col-sm-12 col-xs-12"></div>';
        build += '	<div class="content-column col-md-6 col-sm-12 col-xs-12">';
        build += '		<div class="content-inner">';
        build += '			<h2>' + data.name + '</h2>';
        build += '			<div class="text">' + data.description + '</div>';
        build += '		</div>';
        build += '	</div>';
        build += '</div>';
        return build;
    },

    buildSection5(data) {
        var build = '';
        var img = '';
        $.each(data.images, function (index, value) {
            img = Configuration.imageRoot + value.path;
        })
        build += '<div class="team-block col-md-4 col-sm-6 col-xs-12">';
        build += '	<div class="inner-box">';
        build += '		<div class="image">';
        build += '			<a href="javascript:;"><img src="' + img + '?mode=Crop&width=370&height=350' + '" alt="' + data.name + '" /></a>';
        build += '		</div>';
        build += '		<div class="lower-content">';
        build += '			<h3><a href="javascript:;">' + data.name + '</a></h3>';
        build += '			<div class="designation">' + data.subDescription + '</div>';
        build += '			<div class="text">"' + data.description + '"</div>';
        build += '		</div>';
        build += '	</div>';
        build += '</div>';
        return build;
    }
}