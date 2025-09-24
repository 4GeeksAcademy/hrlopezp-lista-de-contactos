const URL_base = ("https://playground.4geeks.com/contact/agendas/")

export const getAllContacts = async () => {
    try {
        const response = await fetch(`${URL_base}hectorlopez`)
        const data = await response.json()

        if (response.ok) {
           return data.contacts
             } else if (response.status == 404) {
                 createUser()
        } else {
            throw new Error("Error")
        }
    } catch (error) {
        console.log(error)
    }
}



  const createUser = async () => {
             try {
                 const response = await fetch(`${URL_base}hectorlopez`, {
                     method: "POST"
                 })
                 if (response.ok) {
                     getAllContacts()
                 }
             } catch (error) {
                 console.log(error)
             }
         }