const nodemailer = require('nodemailer')

const EMAIL = 'gonzagc22@gmail.com'

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: 'gonzagc22@gmail.com',
            pass: 'cseirmuzpjkyfcyz'
        }
    });
    

const mailOrden = async (user, order) => {
    const prods = order.productos.map((item) => {
        item = {
				nombre:item.nombre,
				precio:item.precio,
				cantidad:item.cantidad,
			};
			return `<tr>
                        <td>
                            ${item.nombre}
                        </td>
                        <td>
                            ${item.precio}
                        </td>
                        <td>
                            ${item.cantidad}
                        </td>
                    </tr>`;
	});
    const items = JSON.stringify(prods);
    try {
        const info = await transporter.sendMail({
            from: "server node",
            to: 'gonzagc22@gmail.com',
            subject: "Nueva orden generada",
            html: `
                <style>
                    .tableProds {
                        border: 1px solid #C0C0C0;
                        border-collapse: collapse;
                        padding: 5px;
                    }
                
                    .tableProds th {
                        border: 1px solid #C0C0C0;
                        padding: 5px;
                        background: #F0F0F0;
                    }
                
                    .tableProds td {
                        border: 1px solid #C0C0C0;
                        padding: 5px;
                    }
                </style>
                <div width="350" height="150" align="center" style="border-radius: 50%;">
                    <img src="http://www.pickmaid.com/dubai/assets/images/success-icon.png" width="60" height="60"
                    style="padding-top:5px" alt="" border="0" />
                </div>
                <h3> Le informamos que se ha confirmado la orden de compra realizada con los siguientes datos:</h3> 
                <p> Orden número: ${order.numero} </p>
                <p> Productos: </p>
                <table class="tableProds">
                <thead>
                    <tr>
                    <th>Item</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                ${prods} 
                </tbody>
                    </table> 
                <p> Total: $ ${order.total} </p>
                <p> Desde ya muchas gracias por su compra. Cualquier duda o consulta no dude en contactarnos.</p>
                `,
        });
        
        console.log(`mailer.js Se genero el envio de mail de la orden: ${order.numero}`);
    } catch (error) {
        console.log(`Error en el envio de la orden: ${error}`);
    } finally {
        console.log("finally Order creada");
    }
    };

const signupMail = async (user) => {
    try {
        const success = await transporter.sendMail({
        from: 'NodeServer Admin',
        to: 'gonzagc22@gmail.com',
        subject: 'Registro de usuario',
        html: `
            <p>Email: ${user.email}</p>
            <p>Nombre: ${user.name}</p>
            <p>Edad: ${user.age}</p>
            <p>Dirección: ${user.address}</p>
            <p>Teléfono: ${user.phone}</p>
        `,
        });
    } catch (error) {
    }

    };

module.exports = {mailOrden, signupMail};



