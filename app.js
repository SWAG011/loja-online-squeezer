
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 10);
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300);
        }

        function switchModals(closeId, openId) {
            closeModal(closeId);
            setTimeout(() => openModal(openId), 300);
        }

        function addToCart(itemName, price) {
            cart.push({ name: itemName, price: price });
            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${itemName} adicionado ao carrinho!`);
            updateCart();
        }

        function updateCart() {
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            cartItems.innerHTML = '';
            let total = 0;

            cart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
                cartItems.appendChild(li);
                total += item.price;
            });

            cartTotal.textContent = total.toFixed(2);
        }

        function clearCart() {
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        }

        function login() {
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            let missingFields = [];

            if (!email) missingFields.push('Email');
            if (!password) missingFields.push('Senha');

            if (missingFields.length > 0) {
                alert(`Por favor, preencha os seguintes campos: ${missingFields.join(', ')}.`);
                return;
            }

            alert('Login bem-sucedido! (Simulação)');
            closeModal('loginModal');
        }

        function signup() {
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            if (name && email && password) {
                alert('Conta criada com sucesso! (Simulação)');
                closeModal('signupModal');
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        }

        function searchAndRedirect(event) {
            event.preventDefault();
            const searchTerm = document.getElementById('searchBar').value.toLowerCase().trim();
            console.log('Pesquisando por:', searchTerm);

            if (searchTerm) {
                const pages = document.getElementsByClassName('page');
                let foundPageId = null;

                for (let page of pages) {
                    const products = page.getElementsByClassName('product');
                    for (let product of products) {
                        const productName = product.getElementsByTagName('p')[0].textContent.toLowerCase();
                        if (productName.includes(searchTerm)) {
                            foundPageId = page.id;
                            break;
                        }
                    }
                    if (foundPageId) break;
                }

                if (foundPageId) {
                    console.log('Produto encontrado na aba:', foundPageId);
                    showPage(foundPageId, searchTerm);
                } else {
                    console.log('Nenhum produto encontrado para:', searchTerm);
                    alert('Nenhum produto encontrado para o termo pesquisado.');
                }
            }
        }

        function showPage(pageId, searchTerm = null) {
            const pages = document.getElementsByClassName('page');
            const links = document.getElementsByTagName('a');

            for (let page of pages) {
                page.classList.remove('active');
            }
            for (let link of links) {
                link.classList.remove('active');
            }

            const targetPage = document.getElementById(pageId);
            targetPage.classList.add('active');
            document.querySelector(`a[onclick="showPage('${pageId}')"]`).classList.add('active');

            const allProducts = document.querySelectorAll('.product');
            allProducts.forEach(product => {
                product.style.display = 'block';
                product.classList.remove('highlighted');
            });

            if (searchTerm) {
                const products = targetPage.getElementsByClassName('product');
                let firstMatch = null;
                let foundAny = false;

                for (let product of products) {
                    const productName = product.getElementsByTagName('p')[0].textContent.toLowerCase();
                    if (productName.includes(searchTerm)) {
                        product.style.display = 'block';
                        product.classList.add('highlighted');
                        foundAny = true;
                        if (!firstMatch) {
                            firstMatch = product;
                        }
                    } else {
                        product.style.display = 'none';
                    }
                }

                if (firstMatch) {
                    setTimeout(() => {
                        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                }

                if (!foundAny) {
                    console.log('Nenhum produto correspondente na aba:', pageId);
                    alert('Nenhum produto encontrado na aba correspondente.');
                }
            }
        }

        function checkout() {
            closeModal('cartModal');
            openModal('checkoutModal');
        }

        function confirmCheckout() {
            const street = document.getElementById('addressStreet').value.trim();
            const number = document.getElementById('addressNumber').value.trim();
            const city = document.getElementById('addressCity').value.trim();
            const zip = document.getElementById('addressZip').value.trim();
            const payment = document.querySelector('input[name="payment"]:checked');

            let missingFields = [];
            if (!street) missingFields.push('Rua');
            if (!number) missingFields.push('Número');
            if (!city) missingFields.push('Cidade');
            if (!zip) missingFields.push('CEP');
            if (!payment) missingFields.push('Método de Pagamento');

            if (missingFields.length > 0) {
                alert(`Por favor, preencha os seguintes campos: ${missingFields.join(', ')}.`);
                return;
            }

            alert('Compra confirmada com sucesso! (Simulação)\nEndereço: ' + street + ', ' + number + ', ' + city + ' - ' + zip + '\nPagamento: ' + payment.value);
            closeModal('checkoutModal');
            clearCart();
        }

        // Load cart and show home page on load
        updateCart();
        document.querySelectorAll('.product').forEach(p => p.style.display = 'block');
    