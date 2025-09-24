import { useState, useEffect } from "react"
import "../style/contact.css"
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getAllContacts } from "../services/apiLista";


const datosContacto = { name: "", phone: "", email: "", address: "" }
const URL_base = ("https://playground.4geeks.com/contact/agendas/")


export function Contact() {

    const { store, dispatch } = useGlobalReducer()
   

    //Borrar un contacto
    const deleteContacto = async (id) => {
        try {
            const response = await fetch(`${URL_base}hectorlopez/contacts/${id}`, {
                method: "DELETE"
            })
            if (response.ok) {
                const responseLista = await getAllContacts()
                dispatch({
                    type: "SET_CONTACTS",
                    payload: responseLista
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

 
    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8">
                        <div className="d-flex justify-content-end">
                            <Link to={"/add-contact"}
                                className="btn btn-success mb-3"
                            >Agregar nuevo contacto
                            </Link>
                        </div>
                        {
                            store.contactosGuardados.map((item) => (
                                <div key={item.id} className="d-flex justify-content-between border border-secondary-subtle">
                                    <div className="d-flex py-2">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${item.name}&size=110&background=random&color=ff0000&rounded=true&font-size=0.33`}
                                            alt="avatar"
                                            className="mx-5"
                                        />
                                        <span className="py-2">
                                            <h5>{item.name}</h5>
                                            <span className="d-flex">
                                                <i className="fa-solid fa-location-dot d-flex align-items-center me-2 ii"></i>
                                                <p className="plistaC letraM">{item.address}</p>
                                            </span>
                                            <span className="d-flex">
                                                <i className="fa-solid fa-phone-flip d-flex align-items-center me-3 ii"></i>
                                                <p className="letraS plistaC">{item.phone}</p>
                                            </span>
                                            <span className="d-flex">
                                                <i className="fa-solid fa-envelope d-flex align-items-center me-3 ii"></i>
                                                <p className="letraSm plistaC">{item.email}</p>
                                            </span>
                                        </span>
                                    </div>
                                    <div className="d-flex my-4 mx-5 gap-4">
                                        <Link to={`/edit-contact/${item.id}`}
                                            className="text-black"
                                        ><i
                                            className="fa-solid fa-pencil"
                                        ></i>
                                        </Link>
                                        <i
                                            className="fa-solid fa-trash py-1"
                                            onClick={() => deleteContacto(item.id)}
                                        ></i>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}











