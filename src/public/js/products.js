function deleteProduct(productId) {
    fetch(`/product/delete/${productId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '/product'; // Redirect to product list after successful deletion
        } else {
            console.error('Error deleting product:', response.status);
        }
    })
    .catch(error => {
        console.error('Error deleting product:', error);
    });
}