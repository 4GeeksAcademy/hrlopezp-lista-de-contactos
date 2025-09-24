import { useState, useEffect } from "react"
import "./contact.css"
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getAllContacts } from "../services/apiLista";


const notify = () => toast('Debes llenar todos los campos');

const datosContacto = { name: "", phone: "", email: "", address: "" }
const URL_base = ("https://playground.4geeks.com/contact/agendas/")

export function AddContact() {

    const {store, dispatch} = useGlobalReducer()

    const [escribircontacto, setEscribirContacto] = useState(datosContacto)

    const [editarContactoId, setEditarContactoId] = useState(null);


    //Al presionar las teclas en los inputs
    const handleChange = (event) => {
        setEscribirContacto({
            ...escribircontacto,
            [event.target.name]: event.target.value
        })
    }


    //Al presionar enter
    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (!escribircontacto.name || !escribircontacto.email || !escribircontacto.phone || !escribircontacto.address) {
            notify();
            return;
        }

        if (editarContactoId) {
            handleEdit(editarContactoId);
        } else {
            handleSubmit();
        }
    };


    //Si se agrega un contacto nuevo
   const handleSubmit = async () => {
           try {
               const response = await fetch(`${URL_base}hectorlopez/contacts`, {
                   method: "POST",
                   headers: {
                       "Content-Type": "application/json"
                   },
                   body: JSON.stringify(escribircontacto)
               })
   
               if (response.ok) {
                   const responseLista = await getAllContacts()
                   dispatch({
                       type: "SET_CONTACTS",
                       payload: responseLista
                   })
               }
               setEscribirContacto(datosContacto)
           } catch (error) {
               console.log(error)
           }
       }


    // Subir el formulario al editar y darle el mismo ID
    const iniciarEdicion = (contacto) => {
        setEscribirContacto(contacto);
        setEditarContactoId(contacto.id);
    };


    //Para actualizar el contatco con el mismo id
    const handleEdit = async (id) => {
        try {
            const response = await fetch(`${URL_base}hectorlopez/contacts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(escribircontacto)
            })

            if (response.ok) {
                getAllContacts()
            }
            setEditarContactoId(null); // volver el id inicial
            setEscribirContacto(datosContacto) // Colocar el formulario vacío de nuevo
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <h1 className="text-center">Add a new contact</h1>
                        <Toaster />
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <label className="mt-2">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control my-2"
                                    placeholder="Full Name"
                                    name="name"
                                    value={escribircontacto.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="mt-2">Email</label>
                                <input
                                    type="email"
                                    className="form-control my-2"
                                    placeholder="Enter email"
                                    name="email"
                                    value={escribircontacto.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="mt-2">Phone</label>
                                <input
                                    type="number"
                                    className="form-control my-2"
                                    placeholder="Enter phone"
                                    name="phone"
                                    value={escribircontacto.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="mt-2">Address</label>
                                <input
                                    type="text"
                                    className="form-control my-2"
                                    placeholder="Enter address"
                                    name="address"
                                    value={escribircontacto.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <button
                                    className="btn btn-primary w-100 mt-2"
                                >
                                    Save Contact"
                                </button>
                            </div>

                            <div className="mb-5">
                               <Link to={"/"}> or get back to contacts</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}











