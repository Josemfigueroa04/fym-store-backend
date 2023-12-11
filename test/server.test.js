const request = require('supertest');
const app = require('../index.js');


describe('Operaciones Crud Api', () => {

    it('GET/productos debe retornar todos los productos', async () => {
        const response = await request(app).get('/productos').send();
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    })

    it('POST/productos debe crear un nuevo producto', async () => {
        const response = await request(app).post('/productos').send({
            title: 'producto test',
            description: 'producto test',
            price: 100,
            quantity: 100,
            category: "test",
            images: "test",
        })
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(expect.any(Object));
    })

    it('PUT/productos/:id debe actualizar un producto', async () => {
        const response = await request(app).put('/productos/1').send({
            title: 'producto test',
            description: 'producto test',
            price: 100,
            quantity: 100,
            category: "test",
            images: "test",
        })
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual('Producto actualizado');
    })

    it('DELETE/productos/:id debe eliminar un producto', async () => {
        const response = await request(app).delete('/productos/1').send();
        expect(response.body).toEqual("Producto eliminado");
    })

});



