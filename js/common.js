
var Loading = {
    show: function (message) {
        jQuery('#divLoading').removeClass('d-none');
        if (message != null) {
            jQuery('#divLoading').find('p').html(message);
        }
    },
    hide: function () {
        jQuery('#divLoading').find('p').html('');
        jQuery('#divLoading').addClass('d-none');
    }
}

var waitingDialog = waitingDialog || (function ($) {
    'use strict';
    //$(".page-loader").show();
    // Creating modal dialog's DOM
    var $dialog = $(
        '<div id="loading-modal" style="width: 100%;height: 100%;position: fixed;top: 0;left: 0;background: rgba(0, 0, 0, .7);z-index: 100000;display: none"><div id="loading-text" style="display: block;position: absolute;top: 40%;transform: translateX(-50%);left: 50%;color: #eee;width: auto;height: 30px;margin: 35px 0 0 0;text-align: center;font-family: \'iCielGotham-Medium\', sans-serif;font-size: 16px;right: 0"></div></div>');

    return {
        /**
		 * Opens our dialog
		 * @param message Custom message
		 * @param options Custom options:
		 * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
		 * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
		 */
        show: function (message, options, bodyHtml) {
            // Assigning defaults
            if (typeof options === 'undefined' || options == null) {
                options = {};
            }
            if (typeof message === 'undefined') {
                message = '<i class="fa fa-spinner fa-spin" style="font-size:60px"></i> đang xử lý...';
            } else {
                message = '<i class="fa fa-spinner fa-spin" style="font-size:60px"></i>' + message;
            }


            var settings = $.extend({
                dialogSize: 'm',
                progressType: '',
                onHide: null // This callback runs after the dialog was hidden
            }, options);

            // Configuring dialog
            $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            $dialog.find('.progress-bar').attr('class', 'progress-bar');
            if (settings.progressType) {
                $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
            }
            $dialog.find('h3').text(message);
            // Adding callbacks
            if (typeof settings.onHide === 'function') {
                $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                    settings.onHide.call($dialog);
                });
            }

            if (bodyHtml) {
                $dialog.find('.modal-body').html(bodyHtml);
            }
            // Opening dialog
            $dialog.modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
            $("#loading-text").html(message);
        },
        /**
		 * Closes dialog
		 */
        hide: function () {
            $dialog.modal('hide');
        }
    };

})(jQuery);

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var messageDialog = messageDialog || (function ($) {
    'use strict';
    //$(".page-loader").show();
    // Creating modal dialog's DOM
    var $dialog = $('<div class="modal fade in" id="basic" tabindex="-1" role="basic" aria-hidden="true" style="display: block; padding-right: 17px;"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button><h4 class="modal-title">Modal Title</h4></div><div class="modal-body"> Modal body goes here </div><div class="modal-footer"><button type="button" class="btn dark btn-outline" data-dismiss="modal">Đóng</button></div></div><!-- /.modal-content --></div><!-- /.modal-dialog --></div>');
    return {
        /**
		 * Opens our dialog
		 * @param message Custom message
		 * @param options Custom options:
		 * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
		 * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
		 */
        show: function (message, bodyHtml, options) {
            // Assigning defaults
            if (typeof options === 'undefined' || options == null) {
                options = {};
            }
            if (typeof message === 'undefined') {
                message = 'Thông báo';
            }

            // Configuring dialog
            $dialog.find('h4').text(message);

            if (bodyHtml) {
                $dialog.find('.modal-body').html(bodyHtml);
            }
            // Opening dialog
            $dialog.modal();
        },
        /**
		 * Closes dialog
		 */
        hide: function () {
            $dialog.modal('hide');
        }
    };

})(jQuery);

var waitingDialog = waitingDialog || (function ($) {
    'use strict';
    //$(".page-loader").show();
    // Creating modal dialog's DOM
    var $dialog = $(
        '<div id="loading-modal"><div id="loading-text"><i class="fa fa-spinner fa-spin" style="font-size:60px"></i> đang xử lý...</div></div>');

    return {
        /**
		 * Opens our dialog
		 * @param message Custom message
		 * @param options Custom options:
		 * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
		 * 				  options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
		 */
        show: function (message, options, bodyHtml) {
            // Assigning defaults
            if (typeof options === 'undefined' || options == null) {
                options = {};
            }
            if (typeof message === 'undefined') {
                message = 'Loading';
            }
            var settings = $.extend({
                dialogSize: 'm',
                progressType: '',
                onHide: null // This callback runs after the dialog was hidden
            }, options);

            // Configuring dialog
            $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            $dialog.find('.progress-bar').attr('class', 'progress-bar');
            if (settings.progressType) {
                $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
            }
            $dialog.find('h3').text(message);
            // Adding callbacks
            if (typeof settings.onHide === 'function') {
                $dialog.off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                    settings.onHide.call($dialog);
                });
            }

            if (bodyHtml) {
                $dialog.find('.modal-body').html(bodyHtml);
            }
            // Opening dialog
            $dialog.modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
        },
        /**
		 * Closes dialog
		 */
        hide: function () {
            $dialog.modal('hide');
        }
    };

})(jQuery);
Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "," : d,
        t = t == undefined ? "." : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function RewriteUrl(str) {
    return change_alias(str).replace(/\s/g, '-');
};

function change_alias(alias) {
    if (alias == null) {
        return '';
    }
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str;
};
function substringInSpace(str, subLength, textExtend) {
    if (str.length < subLength) {
        return str;
    }
    var temp = str.substring(0, subLength);
    temp = temp.substring(0, str.lastIndexOf(" "));
    return temp + textExtend;
};

function pluckById(inArray, value) {
    for (i = 0; i < inArray.length; i++) {
        if (inArray[i].Id === value) {
            return inArray[i];
        }
    }
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};