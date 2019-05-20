const blog = "Blog";

var Blog = {

    $formGetCode: $('#getCode'),

    init: function () {

        var searchParams = {
            index: 'categories',
            type: 'category',
            from: 0,
            size: 100,
            body: {
                "_source": {
                    "includes": ['name', 'images', 'id'],
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
                            },
                        ]
                    }
                }
            }
        };
        client.search(searchParams, function (err, data) {
            var tempId = '';
            var img = '';
            $.each(data.hits.hits, function (index, value) {
                if (value._source.name == blog) {
                    tempId = value._source.id;

                    $.each(value._source.images, function (i, vl) {
                        if (vl.isFeatured) {
                            img = Configuration.imageRoot + vl.path;
                        }
                    })
                    $('#bannerBlog').attr('style', 'background:url(' + img + ')');
                    $('#bannerBlog h2').text(value._source.name);
                }
            })

            var searchParams = {
                index: "articles",
                type: "article2",
                from: 0,
                size: 100,
                body: {
                    "_source": {
                        "includes": ['name', 'images', 'id', 'subDescription', 'createdDate'],
                    },
                    query: {
                        bool: {
                            "must": [
                                {
                                    "match": { "languageId": Configuration.currentLanguage }
                                },
                                {
                                    "match": { "categoryIds": tempId }
                                },
                            ]
                        }
                    }
                }
            };
            client.search(searchParams, function (err, data) {
                $.each(data.hits.hits, function (index, value) {
                    $('.blog-page-section .row').append(Blog.buildItemBlog(value._source))
                })
            })

        })
    },

    initDetail(id) {

        var searchParams = {
            index: 'categories',
            type: 'category',
            from: 0,
            size: 100,
            body: {
                "_source": {
                    "includes": ['name', 'images', 'id'],
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
                            },
                        ]
                    }
                }
            }
        };
        client.search(searchParams, function (err, data) {
            var img = '';
            $.each(data.hits.hits, function (index, value) {
                if (value._source.name == blog) {
                    $.each(value._source.images, function (i, vl) {
                        if (!vl.isFeatured) {
                            img = Configuration.imageRoot + vl.path;
                        }
                    })
                    $('#bannerDetail').attr('style', 'background:url(' + img + ')');
                    // $('#bannerBlog h2').text(value._source.name);
                }
            })
        });

        var searchParams = {
            index: "articles",
            type: "article2",
            from: 0,
            size: 100,
            body: {
                "_source": {
                    "includes": ['name', 'images', 'id', 'subDescription', 'createdDate', 'description', 'categoryIds'],
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
                                "match": { "id": id }
                            },
                        ]
                    }
                }
            }
        };
        client.search(searchParams, function (error, data) {
            $.each(data.hits.hits, function (index, value) {
                $('.our-blog').append(Blog.buildItemDetail(value._source));
            })
        })
    },

    submitFormGetCode() {
        if (!Blog.$formGetCode.valid()) {
            return;
        } else {
            var data = {
                username: $('#getCode input[name="username"]').val(),
                dob: $('#getCode input[name="dob"]').val(),
                phone: $('#getCode input[name="phone_number"]').val(),
                email: $('#getCode input[name="email"]').val(),
                address: $('#getCode input[name="address"]:checked').val(),
                people: $('#getCode input[name="number_people"]:checked').val(),
            }
            console.log(data);
        }
    },

    validateFormGetCode() {

    },

    initSurvey() {
        var searchParams = {
            index: "articles",
            type: "article2",
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
                                "match": { "type": 15 }
                            },
                        ]
                    }
                }
            }
        };
        client.search(searchParams, function (error, data) {
            $.each(data.hits.hits, function (index, value) {
                $.each(value._source.surveyQuestion, function (i, vl) {
                    console.log(vl);
                })
            })
        })
    },

    buildItemBlog(data) {
        var build = '';
        var img = '';
        $.each(data.images, function (index, value) {
            img = Configuration.imageRoot + value.path + '?mode=Crop&width=370&height=263';
        })
        build += '<div class="news-block col-md-4 col-sm-6 col-xs-12">';
        build += '	<div class="inner-box">';
        build += '		<div class="image">';
        build += '			<a href="blog-classic.html?id=' + data.id + '"><img src="' + img + '" alt="" /></a>';
        build += '		</div>';
        build += '		<div class="lower-box">';
        build += '			<h3><a href="blog-classic.html?id=' + data.id + '" title="' + data.name + '">' + substringInSpace(data.name, 50, '...') + '</a></h3>';
        build += '			<div class="post-date">' + data.createdDate.slice(0, 10) + '</div>';
        build += '			<div class="text text-ellipsis line-4" style="text-align: justify">' + data.subDescription + '</div>';
        build += '			<a href="blog-classic.html?id=' + data.id + '" class="read-more">Đọc thêm <span';
        build += '					class="arrow ion-ios-arrow-thin-right"></span></a>';
        build += '		</div>';
        build += '	</div>';
        build += '</div>';
        return build;
    },

    buildItemDetail(data) {
        var build = '';
        var img = '';
        $.each(data.images, function (index, value) {
            img = Configuration.imageRoot + value.path;
        })
        build += '<div class="news-block-two">';
        build += '	<div class="inner-box">';
        build += '		<div class="image"><a href="#"><img src="' + img + '" alt="" /></a>';
        build += '		</div>';
        build += '		<div class="lower-box">';
        build += '			<div class="post-info">' + data.createdDate.slice(0, 10) + '</div>';
        build += '			<h3><a href="javascript:;">' + data.name + '</a></h3>';
        build += '			<div class="text">' + data.description + '</div>';
        build += '		</div>';
        build += '	</div>';
        build += '</div>';
        return build;
    }

}