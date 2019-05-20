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

var Voucher = {

    init() {
        var searchParams = {
            index: "products",
            type: "product",
            from: 0,
            size: 100,
            body: {
                "_source": {
                    "includes": ['name', 'images', 'id', 'price'],
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
                        ]
                    }
                }
            }
        };
        client.search(searchParams, function (error, data) {
            $.each(data.hits.hits, function (index, value) {
                $('.order-page-section .row').append(Voucher.buildItemVoucher(value._source));
            })
        })
    },

    initDetail(id) {
        var searchParams = {
            index: 'products',
            type: 'product',
            from: 0,
            size: 20,
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
                                "match": { "id": id }
                            }
                        ]
                    }
                }
            }
        };
        client.search(searchParams, function (err, data) {
            $.each(data.hits.hits, function (index, value) {
                $('#product_name').text(value._source.name)
                $('.basic-details').append(Voucher.buildVoucherDetail(value._source));
            })

            var searchRelateVoucher = {
                index: 'products',
                type: 'product',
                from: 0,
                size: 10,
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
            client.search(searchRelateVoucher, function (err, data) {
                var relatedProduct = [];
                $.each(data.hits.hits, function (index, value) {
                    relatedProduct.push(value._source);
                })

                if (relatedProduct.length < 3) {
                    var random = getRandom(relatedProduct, relatedProduct.length)
                    $.each(random, function (index, value) {
                        $('.related-posts .row').append(Voucher.buildRelatedVoucher(value));
                    })
                } else {
                    var random = getRandom(relatedProduct, 3)
                    $.each(random, function (index, value) {
                        $('.related-posts .row').append(Voucher.buildRelatedVoucher(value));
                    })
                }
            })
        })
    },

    buildItemVoucher(data) {
        var build = '';
        var img = '';
        if (data.images.length !== 0) {
            $.each(data.images, function (index, value) {
                img = Configuration.imageRoot + value.path + '?mode=Crop&width=356&height=356';
            })
        }
        build += '<div class="product-block col-md-4 col-sm-6 col-xs-12">';
        build += '	<div class="inner-box">';
        build += '		<div class="image">';
        build += '			<img src="' + img + '" alt="" />';
        build += '			<div class="overlay-box">';
        build += '				<a href="voucher-detail.html?id=' + data.id + '" class="theme-btn btn-style-two">Chi tiết</a>';
        build += '			</div>';
        build += '		</div>';
        build += '		<div class="lower-box">';
        build += '			<h3><a href="voucher-detail.html?id=' + data.id + '">' + data.name + '</a></h3>';
        build += '			<div class="price">' + data.price.formatMoney(0, 3) + 'đ</div>';
        build += '		</div>';
        build += '	</div>';
        build += '</div>';
        return build;
    },

    buildVoucherDetail(data) {
        var build = "";
        var img = '';
        $.each(data.images, function (index, value) {
            img = Configuration.imageRoot + value.path;
        })

        build += '<div class="row clearfix">';
        build += '	<div class="image-column col-md-6 col-sm-12 col-xs-12">';
        build += '		<figure class="image-box"><a href="' + img + '" class="lightbox-image"';
        build += '				title="' + data.name + '"><img src="' + img + '" alt=""></a></figure>';
        build += '	</div>';
        build += '	<div class="info-column col-md-6 col-sm-12 col-xs-12">';
        build += '		<div class="details-header">';
        build += '			<h4>' + data.name + '</h4>';
        build += '			<div class="item-price">' + data.price.formatMoney(0, 3) + '</div>';
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
        build += '		<div class="item-categories">Category: <span>Voucher</span></div>';
        build += '	</div>';
        build += '</div>';
        return build;
    },

    buildRelatedVoucher(data) {
        var build = '';
        var img = '';

        $.each(data.images, function (index, value) {
            img = Configuration.imageRoot + value.path + '?mode=Crop&width=356&height=356';
        })
        build += '<div class="product-block col-md-4 col-sm-6 col-xs-12">';
        build += '	<div class="inner-box">';
        build += '		<div class="image">';
        build += '			<img src="' + img + '" alt="" />';
        build += '			<div class="overlay-box">';
        build += '				<a href="voucher-detail.html?id=' + data.id + '" class="theme-btn btn-style-two">Add to Cart</a>';
        build += '			</div>';
        build += '		</div>';
        build += '		<div class="lower-box">';
        build += '			<h3><a href="voucher-detail.html?id=' + data.id + '">' + data.name + '</a></h3>';
        build += '			<div class="price">' + data.price.formatMoney(0, 3) + 'đ</div>';
        build += '		</div>';
        build += '	</div>';
        build += '</div>';
        return build;
    },
}