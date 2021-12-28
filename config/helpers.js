/**
 * @Author: Le Vu Huy
 * @Date:   2021-12-29 02:35:52
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2021-12-29 02:36:59
 */
module.exports = {
    renderRatingStar: function (rating) {
        if (rating === 5) {

            const dom = '<span class="fa fa-star checked"></span>\n<span class="fa fa-star checked"></span>\n<span class="fa fa-star checked"></span>\n<span class="fa fa-star checked"></span>\n<span class="fa fa-star checked"></span>';

            return dom;
        }
        else if (rating === 4) {
            const dom = '<span class="fa fa-star checked"></span>\n<span class="fa fa-star checked"></span>\n<span class="fa fa-star checked"></span>\n<span class="fa fa-star checked"></span>\n<span class="fa fa-star"></span>'

            return dom;
        }
        else if (rating === 3) {
            const dom = '<span class="fa fa-star checked"></span>\n<span class="fa fa-star checked"></span>\n<span class="fa fa-star checked"></span>\n<span class="fa fa-star"></span>\n<span class="fa fa-star"></span>'

            return dom;
        }
        else if (rating === 2) {
            const dom = '<span class="fa fa-star checked"></span>\n<span class="fa fa-star checked"></span>\n<span class="fa fa-star"></span>\n<span class="fa fa-star"></span>\n<span class="fa fa-star"></span>'

            return dom;
        }
        else if (rating === 1) {
            const dom = '<span class="fa fa-star checked"></span>\n<span class="fa fa-star"></span>\n<span class="fa fa-star"></span>\n<span class="fa fa-star"></span>\n<span class="fa fa-star"></span>'

            return dom;
        }
    },
}