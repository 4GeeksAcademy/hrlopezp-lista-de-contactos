import { useState, useEffect } from "react"
import "../style/contact.css"
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getAllContacts } from "../services/apiLista";
import { useParams } from "react-router-dom";


const notify = () => toast('Debes llenar todos los campos');
const actualizado = () => toast("Contacto actualizado con éxito, revisa la lista de contactos")

const datosContacto = { name: "", phone: "", email: "", address: "" }
const URL_base = ("https://playground.4geeks.com/contact/agendas/")

export function AddContact() {

    const { store, dispatch } = useGlobalReducer()
    const [escribircontacto, setEscribirContacto] = useState(datosContacto)
    const { theid } = useParams()



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

        if (theid) {
            handleEdit();
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


    //Si vamos a editar un contacto 
       const handleEdit = async () => {
        try {
            const response = await fetch(`${URL_base}hectorlopez/contacts/${theid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(escribircontacto),
            });
            if (response.ok) {
                const responseLista = await getAllContacts();
                dispatch({
                    type: "SET_CONTACTS",
                    payload: responseLista,
                });
                actualizado();
            }
            setEscribirContacto(datosContacto)
        } catch (error) {
            console.log(error);
        }
    };

    //    const getContacts =async ()=> {
    //     let editarContacto= store.contactosGuardados.find((item) => item.id == theid)
    //       setEscribirContacto(editarContacto)
    //    }

    useEffect(() => {
        if (theid) {
            const editarContacto = store.contactosGuardados.find((item) => item.id == theid
            );
            if (editarContacto) {
                setEscribirContacto(editarContacto);
            }
        } else {
            setEscribirContacto(datosContacto);
        }
    }, [theid, store.contactosGuardados]);


    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <h1 className="text-center">Agregar nuevo contacto</h1>
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
                                    className={`btn w-100 mt-2 ${theid ? "btn-success": "btn-primary"}`}
                                >
                                   {theid ? "Actualizar contacto" : "Guardar contacto"}
                                </button>
                            </div>

                            <div className="mb-5 mt-3">
                                <Link to={"/"}> Regresar a la lista de contactos</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}











