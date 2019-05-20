const banner_menu = "Banner Menu";

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
};

var Dish = {

    dishDetail(id) {
        var searchParams = {
            index: 'dishs',
            type: 'dish',
            from: 0,
            size: 20,
            body: {
                // "_source": {
                //     "includes": ["categories", 'name', 'subDescription', 'images', 'price'],
                // },
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
                            }
                        ]
                    }
                }
            }
        };
        client.search(searchParams, function (err, data) {
            var category_id = '';
            $.each(data.hits.hits, function (index, value) {
                $('#product_name').text(value._source.name)
                $('.basic-details').append(Dish.buildDishDetail(value._source));
                $.each(value._source.categories, function (i, vl) {
                    category_id = vl.id;
                })
            })
            var searchRelateProduct = {
                index: 'dishs',
                type: 'dish',
                from: 0,
                size: 10,
                body: {
                    "_source": {
                        "includes": ['name', 'images', 'price', 'id', 'attributes', 'variants'],
                    },
                    query: {
                        bool: {
                            "must": [
                                {
                                    "match": { "languageId": Configuration.currentLanguage }
                                },
                                {
                                    query_string: {
                                        default_field: "categories.id",
                                        query: category_id
                                    }
                                },
                            ],
                            "must_not": [
                                {
                                    query_string: {
                                        default_field: "id",
                                        query: id
                                    }
                                },
                            ]
                        }
                    }
                }
            };
            client.search(searchRelateProduct, function (err, data) {
                var relatedProduct = [];
                $.each(data.hits.hits, function (index, value) {
                    relatedProduct.push(value._source);
                })

                if (relatedProduct.length < 3) {
                    var random = getRandom(relatedProduct, relatedProduct.length)
                    $.each(random, function (index, value) {
                        $('.related-posts .row').append(Dish.buildRelatedProduct(value));
                    })
                } else {
                    var random = getRandom(relatedProduct, 3)
                    $.each(random, function (index, value) {
                        $('.related-posts .row').append(Dish.buildRelatedProduct(value));
                    })
                }
            })
        })
    },


    listMenu() {

        var searchBanners = {
            index: 'categories',
            type: 'category',
            from: 0,
            size: 20,
            body: {
                "_source": {
                    "includes": ["displayOrder", 'name', 'relationIds', 'images', 'id'],
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
        client.search(searchBanners, function (err, data) {
            var img = '';
            $.each(data.hits.hits, function (index, value) {
                if (value._source.name === banner_menu) {
                    $.each(value._source.images, function (i, vl) {
                        img = Configuration.imageRoot + vl.path;
                    })
                    $('.page-title').attr('style', 'background-image : url(' + img + ')');
                }
            })
        })



        var searchParams = {
            index: 'categories',
            type: 'category',
            from: 0,
            size: 20,
            body: {
                "_source": {
                    "includes": ["displayOrder", 'name', 'relationIds', 'images', 'id'],
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
                                "match": { "type": 3 }
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
            var productRelated = '';

            var img = '';
            var dataCategory = [];
            var dataDish = [];

            $.each(data.hits.hits, function (index, value) {
                productRelated += value._source.relationIds.toString(' ') + ' ';
                dataCategory.push(value._source);
            })

            var searchProducts = {
                index: 'dishs',
                type: 'dish',
                from: 0,
                size: 100,
                body: {
                    "_source": {
                        "includes": ['name', 'price', 'subDescription', 'id', 'categories', 'attributes', 'variants'],
                    },
                    query: {
                        bool: {
                            "must": [
                                {
                                    "match": { "languageId": Configuration.currentLanguage }
                                },
                                {
                                    query_string: {
                                        default_field: "id",
                                        query: productRelated
                                    }
                                }
                            ]
                        }
                    }
                }
            };
            client.search(searchProducts, function (error, dataProduct) {
                $.each(dataProduct.hits.hits, function (index, value) {
                    dataDish.push(value._source)
                })

                for (i = 1; i < dataCategory.length; i++) {
                    if (i % 2 === 0) {
                        var temp = dataCategory.find(e => e.displayOrder === i);
                        $('.section_menu_' + i + ' .sec-title h2').text(temp.name);
                        $('.section_menu_' + i).attr('id', 'p_' + temp.id + '');
                        $.each(temp.relationIds, function (ind, vl) {
                            var tempDish = dataDish.find(e => e.id === vl);
                            if (tempDish !== undefined) {
                                $('#p_' + temp.id + ' .row').append(Dish.buildItemsDish(i, tempDish));
                            }
                        })
                        $.each(temp.images, function (i, vl) {
                            img = Configuration.imageRoot + vl.path;
                        })
                        $('.section_menu_' + i).attr('style', 'background-image: url(' + img + ')');
                    } else {
                        var temp = dataCategory.find(e => e.displayOrder === i);
                        $('.section_menu_' + i + ' .sec-title h2').text(temp.name);
                        $('.section_menu_' + i).attr('id', 'p_' + temp.id + '');
                        $.each(temp.relationIds, function (ind, vl) {
                            var tempDish = dataDish.find(e => e.id === vl);
                            if (tempDish !== undefined) {
                                $('#p_' + temp.id + ' .row').append(Dish.buildItemsDish(i, tempDish));
                            }
                        })
                    }
                }
            })
        })



        var searchSpecialProduct = {
            index: 'categories',
            type: 'category',
            from: 0,
            size: 20,
            body: {
                "_source": {
                    "includes": ["displayOrder", 'name', 'relationIds'],
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
                                "match": { "type": 32 }
                            }
                        ]
                    }
                },
                "sort": [
                    { "displayOrder": { "order": "asc" } }
                ],
            }
        };
        client.search(searchSpecialProduct, function (err, data) {
            var tempId = '';
            $.each(data.hits.hits, function (index, value) {

                if (value._source.displayOrder === 8) {
                    $('.special-section h2').text(value._source.name)
                    tempId += value._source.relationIds.toString(' ') + ' ';
                }
            })

            var searchProductSpecial = {
                index: 'dishs',
                type: 'dish',
                from: 0,
                size: 100,
                body: {
                    "_source": {
                        "includes": ['name', 'price', 'images', 'id', 'subDescription'],
                    },
                    query: {
                        bool: {
                            "must": [
                                {
                                    "match": { "languageId": Configuration.currentLanguage }
                                },
                                {
                                    query_string: {
                                        default_field: "id",
                                        query: tempId
                                    }
                                }
                            ]
                        }
                    }
                }
            };
            client.search(searchProductSpecial, function (err, data) {
                $.each(data.hits.hits, function (index, value) {
                    $('.special-section .row').append(Dish.buildSpecialItem(value._source));
                })
            })
        })
    },

    buildDishDetail(data) {
        var build = "";
        var img = '';
        var category_name = '';
        var dataVariants = [];
        $.each(data.images, function (index, value) {
            img = Configuration.imageRoot + value.path;
        })
        $.each(data.categories, function (index, value) {
            category_name = value.name;
        })
        if (data.price === 0) {
            $.each(data.variants, function (i, vl) {
                var dataAttr = {
                    weight: '',
                    price: '',
                }
                dataAttr.price = vl.price.formatMoney(0, 3);
                var temp = data.attributes[0].attributeValues.find(e => e.id === vl.attributeValueIds[0])
                dataAttr.weight = temp.value;
                dataVariants.push(dataAttr);
            })
        }
        build += '<div class="row clearfix">';
        build += '	<div class="image-column col-md-6 col-sm-12 col-xs-12">';
        build += '		<figure class="image-box"><a href="' + img + '" class="lightbox-image"';
        build += '				title="' + data.name + '"><img src="' + img + '" alt=""></a></figure>';
        build += '	</div>';
        build += '	<div class="info-column col-md-6 col-sm-12 col-xs-12">';
        build += '		<div class="details-header">';
        build += '			<h4>' + data.name + '</h4>';
        if (data.price !== 0) {
            build += '			<div class="item-price">' + data.price.formatMoney(0, 3) + '</div>';
        } else {
            $.each(dataVariants, function (ind, value) {
                build += '       <div class="clearfix">';
                build += '            <div class="pull-left item-price">' + value.weight + '</div>';
                build += '            <div class="pull-left item-price"> ---- ' + value.price + 'VNĐ</div>';
                build += '        </div> ';
            })
        }
        build += '		</div>';
        build += '		<div class="text">' + data.subDescription + '</div>';
        build += '		<div class="clearfix">';
        // build += '			<div class="item-quantity">';
        // build += '				<div class="quantity-spinner"><button type="button" class="minus"><span';
        // build += '							class="fa fa-minus"></span></button><input type="text"';
        // build += '						name="product" value="2" class="prod_qty" /><button type="button"';
        // build += '						class="plus"><span class="fa fa-plus"></span></button></div>';
        // build += '			</div>';
        // build+='			<button type="button" class="theme-btn btn-style-two add-to-cart"> Add To Cart';
        build += '			</button>';
        build += '		</div>';
        // build += '		<div class="item-categories">Weight: <span>340 gr</span></div>';
        build += '		<div class="item-categories">Category: <span>' + category_name + '</span></div>';
        build += '	</div>';
        build += '</div>';
        return build;
    },

    buildRelatedProduct(data) {
        var build = '';
        var img = '';
        var dataVariants = [];

        $.each(data.images, function (index, value) {
            img = Configuration.imageRoot + value.path + '?mode=Crop&width=356&height=356';
        })
        if (data.price === 0) {
            $.each(data.variants, function (i, vl) {
                var dataAttr = {
                    weight: '',
                    price: '',
                }
                dataAttr.price = vl.price.formatMoney(0, 3);
                var temp = data.attributes[0].attributeValues.find(e => e.id === vl.attributeValueIds[0])
                dataAttr.weight = temp.value;
                dataVariants.push(dataAttr);
            })
        }
        build += '<div class="product-block col-md-4 col-sm-6 col-xs-12">';
        build += '	<div class="inner-box">';
        build += '		<div class="image">';
        build += '			<img src="' + img + '" alt="" />';
        build += '			<div class="overlay-box">';
        build += '				<a href="shop-single.html" class="theme-btn btn-style-two">Add to Cart</a>';
        build += '			</div>';
        build += '		</div>';
        build += '		<div class="lower-box">';
        build += '			<h3><a href="shop-single.html?id=' + data.id + '">' + data.name + '</a></h3>';
        if (data.price !== 0) {
            build += '			<div class="price">' + data.price.formatMoney(0, 3) + 'đ</div>';
        } else {
            $.each(dataVariants, function (ind, value) {
                build += '       <div class="text-center w-100">';
                build += '            <span class="item-price">' + value.weight + '</span>';
                build += '            <span class="item-price"> ---- ' + value.price + 'VNĐ</span>';
                build += '        </div> ';
            })
        }
        build += '		</div>';
        build += '	</div>';
        build += '</div>';
        return build;
    },

    buildItemsDish(index, data) {
        var build = '';
        var str = '';
        var dataVariants = [];
        if (index % 2 === 0) {
            str = 'style-two';
        }
        if (data.price === 0) {
            $.each(data.variants, function (i, vl) {
                var dataAttr = {
                    weight: '',
                    price: '',
                }
                dataAttr.price = vl.price.formatMoney(0, 3);
                var temp = data.attributes[0].attributeValues.find(e => e.id === vl.attributeValueIds[0])
                dataAttr.weight = temp.value;
                dataVariants.push(dataAttr);
            })
        }
        build += '<div class="menu-block ' + str + ' col-md-4 col-sm-6 col-xs-12">';
        build += '	<div class="inner-box">';
        build += '		<div class="info clearfix">';
        if (data.price !== 0) {
            build += '			<div class="pull-left">';
            build += '				<h3><a href="shop-single.html?id=' + data.id + '" title="' + data.name + '">' + substringInSpace(data.name, 20, '...') + '</a></h3>';
            build += '			</div>';
            build += '			<div class="pull-right">';
            build += '				<div class="price">' + data.price.formatMoney(0, 3) + '</div>';
            build += '			</div>';
        } else {
            build += '			<div class="pull-left">';
            build += '				<h3><a href="shop-single.html?id=' + data.id + '" title="' + data.name + '">' + data.name + '</a></h3>';
            build += '			</div>';
        }
        build += '		</div>';
        build += '		<div class="text" style="height: 50px;">' + data.subDescription + '</div>';
        if (data.price === 0) {
            $.each(dataVariants, function (ind, value) {
                build += '       <div class="clearfix">';
                build += '            <div class="pull-left text">' + value.weight + '</div>';
                build += '            <div class="pull-right text">' + value.price + '</div>';
                build += '        </div> ';
            })
        }
        build += '	</div>';
        build += '</div>';
        return build;
    },

    buildSpecialItem(data) {
        var build = '';
        var img = '';
        $.each(data.images, function (index, value) {
            img = Configuration.imageRoot + value.path + '?mode=Crop&width=356&height=356';
        })
        build += '<div class="special-block col-md-4 col-sm-6 col-xs-12">';
        build += '	<div class="inner-box">';
        build += '		<div class="image">';
        build += '			<a href="#"><img src="' + img + '" alt="" /></a>';
        build += '		</div>';
        build += '		<div class="lower-box">';
        build += '			<div class="info clearfix">';
        build += '				<div class="pull-left">';
        build += '					<h3><a href="shop-single.html?id=' + data.id + '" title="' + data.name + '">' + substringInSpace(data.name, 20, '...') + '</a></h3>';
        build += '				</div>';
        build += '				<div class="pull-right">';
        build += '					<div class="price">' + data.price.formatMoney(0, 3) + '</div>';
        build += '				</div>';
        build += '			</div>';
        build += '			<div class="text">' + data.subDescription + '</div>';
        build += '		</div>';
        build += '	</div>';
        build += '</div>';
        return build;
    }

}