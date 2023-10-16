window.addEventListener('scroll', function () {
    const left_item_page = document.getElementById('left-scroll');
    const scrollPosition = window.scrollY;
    const footer = document.getElementById('footer');
    const footerPosition = footer.getBoundingClientRect().top;
    if (scrollPosition <= 500) {
        left_item_page.style.position = 'relative';
        left_item_page.style.top = '0';
    } else {
        left_item_page.style.position = 'fixed';
        left_item_page.style.top = '-30px';
        left_item_page.style.width ='254px'
        left_item_page.style.transition = '0.5s';
        left_item_page.style.overflow ='auto';
    }
    
});

const input = document.getElementById('file-input');
const image = document.getElementById('img-preview');

input.addEventListener('change', (e) => {
    if (e.target.files.length) {
        const src = URL.createObjectURL(e.target.files[0]);
        image.src = src;
    }
});


const radioButtons = document.getElementsByName('option');
const priceDetailsProdDiv = document.querySelector('.price-details-prod');

var option_price_lst = document.querySelectorAll('.option-price');
var coin_option = document.getElementById('dropdown-coin-option');
var coin_number_input = document.getElementById('coin-number');

coin_option.addEventListener('change', function(){
    coin_number_input.value = coin_option.value;
});

radioButtons.forEach((radio) => {
  radio.addEventListener('change', function() {
    if (radio.value === '1') {
      priceDetailsProdDiv.style.display = 'block';
      option_price_lst[1].style.backgroundColor = "var(--primary-color)"; 
      option_price_lst[1].style.color = "#fff"; 

      option_price_lst[2].style.background = "none"; 
      option_price_lst[2].style.color = "#000"; 

      option_price_lst[0].style.background = "none"; 
      option_price_lst[0].style.color = "#000"; 


    } else if(radio.value === '2'){
        priceDetailsProdDiv.style.display = 'block';
        option_price_lst[2].style.backgroundColor = "var(--primary-color)"; 
        option_price_lst[2].style.color = "#fff"; 
  
        option_price_lst[1].style.background = "none"; 
        option_price_lst[1].style.color = "#000"; 
  
        option_price_lst[0].style.background = "none"; 
        option_price_lst[0].style.color = "#000"; 
    } 
    else {
        priceDetailsProdDiv.style.display = 'none';
      option_price_lst[0].style.backgroundColor = "var(--primary-color)"; 
      option_price_lst[0].style.color = "#fff"; 

      option_price_lst[1].style.background = "none"; 
      option_price_lst[1].style.color = "#000"; 

      option_price_lst[2].style.background = "none"; 
      option_price_lst[2].style.color = "#000"; 
    }
  });
});

document.getElementById('fileInputMultiple').addEventListener('change', function() {
    var fileCount = this.files.length;
    var fileCountText = fileCount === 1 ? 'Đã chọn 1 ảnh' : 'Đã chọn '+ fileCount + ' ảnh';
    
    document.getElementById('fileCount').textContent = fileCountText;})