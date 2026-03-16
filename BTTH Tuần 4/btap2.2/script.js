const prices = {
    "Áo": 150000,
    "Quần": 200000,
    "Giày": 300000,
    "Mũ": 50000
};

const form = document.getElementById('orderForm');
const confirmation = document.getElementById('confirmation');
const successMessage = document.getElementById('successMessage');
const totalPriceEl = document.getElementById('totalPrice');
const charCountEl = document.getElementById('charCount');
const noteEl = document.getElementById('note');

// Tính tổng tiền
function calculateTotal() {
    const product = document.getElementById('product').value;
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    if (product && quantity > 0) {
        const total = prices[product] * quantity;
        totalPriceEl.textContent = total.toLocaleString('vi-VN') + ' VND';
    } else {
        totalPriceEl.textContent = '0 VND';
    }
}

// Đếm ký tự cho ghi chú
function updateCharCount() {
    const length = noteEl.value.length;
    charCountEl.textContent = `${length}/200`;
    if (length > 200) {
        charCountEl.classList.add('over');
        document.getElementById('noteError').textContent = 'Ghi chú không được quá 200 ký tự';
    } else {
        charCountEl.classList.remove('over');
        document.getElementById('noteError').textContent = '';
    }
}

// Validate từng trường
function validateField(field, errorEl, validator) {
    const value = field.value.trim();
    const error = validator(value);
    errorEl.textContent = error;
    return !error;
}

function productValidator(value) {
    if (!value) return 'Vui lòng chọn sản phẩm';
    return '';
}

function quantityValidator(value) {
    const num = parseInt(value);
    if (isNaN(num) || num < 1 || num > 99) return 'Số lượng phải từ 1 đến 99';
    return '';
}

function deliveryDateValidator(value) {
    if (!value) return 'Vui lòng chọn ngày giao hàng';
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    if (selectedDate < today) return 'Ngày giao hàng không được là ngày trong quá khứ';
    if (selectedDate > maxDate) return 'Ngày giao hàng không được quá 30 ngày từ hôm nay';
    return '';
}

function addressValidator(value) {
    if (!value) return 'Vui lòng nhập địa chỉ giao hàng';
    if (value.length < 10) return 'Địa chỉ giao hàng phải ít nhất 10 ký tự';
    return '';
}

function noteValidator(value) {
    if (value.length > 200) return 'Ghi chú không được quá 200 ký tự';
    return '';
}

function paymentValidator() {
    const payment = document.querySelector('input[name="payment"]:checked');
    if (!payment) return 'Vui lòng chọn phương thức thanh toán';
    return '';
}

// Sự kiện
document.getElementById('product').addEventListener('change', calculateTotal);
document.getElementById('quantity').addEventListener('input', calculateTotal);
noteEl.addEventListener('input', updateCharCount);

// Blur events
document.getElementById('product').addEventListener('blur', () => validateField(document.getElementById('product'), document.getElementById('productError'), productValidator));
document.getElementById('quantity').addEventListener('blur', () => validateField(document.getElementById('quantity'), document.getElementById('quantityError'), quantityValidator));
document.getElementById('deliveryDate').addEventListener('blur', () => validateField(document.getElementById('deliveryDate'), document.getElementById('deliveryDateError'), deliveryDateValidator));
document.getElementById('address').addEventListener('blur', () => validateField(document.getElementById('address'), document.getElementById('addressError'), addressValidator));
noteEl.addEventListener('blur', () => validateField(noteEl, document.getElementById('noteError'), noteValidator));

// Input events to clear errors
document.getElementById('product').addEventListener('input', () => document.getElementById('productError').textContent = '');
document.getElementById('quantity').addEventListener('input', () => document.getElementById('quantityError').textContent = '');
document.getElementById('deliveryDate').addEventListener('input', () => document.getElementById('deliveryDateError').textContent = '');
document.getElementById('address').addEventListener('input', () => document.getElementById('addressError').textContent = '');
noteEl.addEventListener('input', () => document.getElementById('noteError').textContent = '');

// Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    isValid &= validateField(document.getElementById('product'), document.getElementById('productError'), productValidator);
    isValid &= validateField(document.getElementById('quantity'), document.getElementById('quantityError'), quantityValidator);
    isValid &= validateField(document.getElementById('deliveryDate'), document.getElementById('deliveryDateError'), deliveryDateValidator);
    isValid &= validateField(document.getElementById('address'), document.getElementById('addressError'), addressValidator);
    isValid &= validateField(noteEl, document.getElementById('noteError'), noteValidator);
    const paymentError = paymentValidator();
    document.getElementById('paymentError').textContent = paymentError;
    isValid &= !paymentError;

    if (isValid) {
        // Show confirmation
        document.getElementById('confirmProduct').textContent = document.getElementById('product').value;
        document.getElementById('confirmQuantity').textContent = document.getElementById('quantity').value;
        document.getElementById('confirmTotal').textContent = totalPriceEl.textContent;
        document.getElementById('confirmDate').textContent = document.getElementById('deliveryDate').value;
        confirmation.classList.remove('hidden');
    }
});

// Confirmation buttons
document.getElementById('confirmBtn').addEventListener('click', () => {
    confirmation.classList.add('hidden');
    successMessage.classList.remove('hidden');
});

document.getElementById('cancelBtn').addEventListener('click', () => {
    confirmation.classList.add('hidden');
});

// Payment radio change to clear error
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', () => document.getElementById('paymentError').textContent = '');
});