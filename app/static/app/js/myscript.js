

$('#slider1, #slider2, #slider3').owlCarousel({
    loop: true,
    margin: 20,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: false,
            autoplay: true,
        },
        600: {
            items: 3,
            nav: true,
            autoplay: true,
        },
        1000: {
            items: 5,
            nav: true,
            loop: true,
            autoplay: true,
        }
    }
})


// PLUS CART
$(document).on('click', '.plus-cart', function(){
    var id = $(this).attr("pid").toString();
    var eml = this;

    $.ajax({
        type: "GET",
        url: "/pluscart",
        data: {
            prod_id: id
        },
        success: function(data){
            // Update quantity near clicked button
            $(eml).siblings('span#quantity').text(data.quantity);

            // Update totals
            $('#amount').text(data.amount);
            $('#totalamount').text(data.totalamount);
        }
    });
});



// MINUS CART
$(document).on('click', '.minus-cart', function(){
    var id = $(this).attr("pid").toString();
    var eml = this;

    $.ajax({
        type: "GET",
        url: "/minuscart",
        data: {
            prod_id: id
        },
        success: function(data){
            // Update quantity
            $(eml).siblings('span#quantity').text(data.quantity);

            // Update totals
            $('#amount').text(data.amount);
            $('#totalamount').text(data.totalamount);

            // Optional: if quantity becomes 0, remove the item
            if (data.quantity === 0) {
                $(eml).closest('.cart-item').remove();
            }
        }
    });
});

$(document).on('click', '.plus-product, .minus-product', function () {
    const id = $(this).attr("pid");
    const url = $(this).hasClass('plus-product') ? "/plusproduct" : "/minusproduct";
  
    $.ajax({
      type: "GET",
      url: url,
      data: { prod_id: id },
      success: function (data) {
        $('#quantityDisplay').text(data.quantity);
        $('#quantityInput').val(data.quantity); // ✅ hidden input inside form
  
        $('#amount').text(data.amount.toFixed(2));
        $('#shipping').text(data.shipping_amount.toFixed(2));
        $('#totalamount').text(data.totalamount.toFixed(2));
      }
    });
  });
  
  // Optional: Make sure quantity is synced right before submit
  document.getElementById("order-form").addEventListener("submit", function () {
    const qty = document.getElementById("quantityDisplay").innerText;
    document.getElementById("quantityInput").value = qty;
  });
  


// remove-cart
$(document).on('click', '.remove-cart', function(){
    var id = $(this).attr("pid").toString();
    var eml = this;

    $.ajax({
        type: "GET",
        url: "/removecart",
        data: {
            prod_id: id
        },
        success: function(data){
            console.log('deleted');
            document.getElementById('amount').innerText = data.amount;
            document.getElementById('totalamount').innerText = data.totalamount;
            eml.closest('.cart-item').remove(); // cleaner alternative
        }
    });
});


