// Los hooks son :
// Los que permiten usar el estado 
//y otras características de React 
//sin escribir una clase.

//  Los props son propiedades 
// estos se usan para heredar informacion 
// un componente A le puede pasar el props al componente
// B
//Los props son la manera que un 
//componente superior manda información 
//a componentes inferiores.

// El state es el estado de un componente

//Los props y state hacen cosas similares, pero son usados de diferente manera.ghbn u
//Props son usados para pasar datos de componentes padres a sub componentes, son inmutables y no deberían cambiar.
//State es usado para datos cambiantes. Los componentes vuelven a llamar a render cuando este cambia.

//JSX es una extensión de sintaxis de JavaScript que nos permite mezclar
// JS y HTML (XML), de ahí su nombre JavaScript XML.

//BabelJS
//Nuestro código JSX es compilado por un “Transpiler”, que quiere decir que toma un código de un lenguaje y lo compila al mismo código en otro lenguaje. Este “Transpiler”, llamado Babel JS, compila el código JSX a código JS.

//Esto nos permite:
//Asignar expresiones JSX a variables.
//Pasar expresiones JSX como argumentos de funciones.
//Retornar expresiones JSX de ciclos, condicionales y funciones.

import {useEffect, useState} from 'react';
const  useFetch = (url) => {

const [loading, setLoading] = useState(true)
const [data, setData] = useState([])

const fetchData = async () => {
    const reponse = await fetch(url)
    const data = await reponse.json()
    setData(data)
    setLoading(false)
}

useEffect(() => {
    fetchData()
}, [])

return {loading, data}
}

export default useFetch