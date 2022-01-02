/**
 * @Author: Le Vu Huy
 * @Date:   2022-01-02 17:31:50
 * @Last Modified by:   Le Vu Huy
 * @Last Modified time: 2022-01-02 18:44:43
 */
exports.renderPage=async (req,res) => {

    const id=req.query.id;
    const methodPayment=req.query.method;
    const statusPayment=req.query.status;
    const total=req.query.total;
    const voucher=req.query.voucher === "true" ? true : false;
    const nameVoucher=req.query.nameVoucher;
    const shopping=req.query.shopping === "true" ? true : false;

    res.render('result',{
        id:id,
        methodPayment:methodPayment === "creditcard" ? "Credit card" : "Thanh toán khi nhận hàng",
        statusPayment:statusPayment === "dathanhtoan" ? "Đã thanh toán" : "Chưa thanh toán",
        price:total,
        voucher:voucher,
        nameVoucher:nameVoucher,
        shopping:shopping    
    });
}