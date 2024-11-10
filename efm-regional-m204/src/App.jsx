import { useState, useEffect } from "react";
function App() {
    const [msg, setMsg] = useState("")
    const [id, setId] = useState(1)
    const [matricule, setMatricule] = useState("")
    const [nom, setNom] = useState("")
    const [ville, setVille] = useState("")
    const [codePostale, setCodePostale] = useState("")
    const [moyennes, setMoyennes] = useState("")
    const [students2, setStudents2] = useState([])
    const [students, setStudents] = useState([{ id: 1, matricule: 1454, nom: "Alaoui ", codePostale: 20400, ville: 'casa', moyennes: 12.56 },
    { id: 2, matricule: 1455, nom: "Mansouri ", codePostale: 20400, ville: 'casa', moyennes: 14.67 }])
    const filterNomVille = () => {
        let filteredStudents = students.filter((item) => item.nom === nom && item.ville === ville);
        setStudents2(filteredStudents);
    };
    function incrementer() {
        return students.length + 2
    }
    const handleDelete = (id) => {
        let newStudents = students.filter(li => li.id !== id)
        setStudents(newStudents)
    }
    const handleUpdate = (id) => {
        let newStudents = students.map(item => {
            if (item.id === id) {
                item.matricule = matricule
                item.nom = nom
                item.ville = ville
                item.codePostale = codePostale
                item.moyennes = moyennes
            }
            return item
        })
        setStudents(newStudents)
    }
    const Vider = () => {
        setId("")
        setMatricule("")
        setNom("")
        setVille("")
        setCodePostale("")
        setMoyennes("")
    }
    const clearFilter = () => {
        setStudents2([{}])
    }
    const Ajouter = (e) => {
        let matFind = students.find((item) => {
            return item.matricule == matricule
        })
        e.preventDefault()
        if (moyennes > 20 || moyennes < 0) {
            console.log("Code postale et moyenne doit etre entre 0 et 20")
        } else if ((matFind)) {
            console.log("Matricule duplicated")
        }
        else if (matricule === "0" || nom === "" || ville === "" || codePostale === "" || moyennes === "") {
            console.log("please fill all the empty fields")
        } else {
            const nextID = incrementer()
            setId(nextID)
            setStudents([...students, { id, matricule, nom, ville, codePostale, moyennes }])
        }
    }
    useEffect(() => {
        if (students.length === 0) {
            setMsg("Tablaux vide")
        } else {
            setMsg("")
        }
    }, [students])

    let moyEleve = students.length > 0 ? Math.max(...students.map((student) => student.moyennes)) : 0;
    let moyMoins = students.length > 0 ? Math.min(...students.map((student) => student.moyennes)) : 0;
    let moyGaneral = students.length > 0
    ? (students.reduce((sum, student) => sum + (student.moyennes), 0) / students.length)
    : 0;

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <div className="flex ">
                <form className="space-y-4 w-6/12">
                    <label>ID</label>
                    <input className="block w-full p-2 border border-gray-300 rounded" type="number" placeholder="ID" value={incrementer() - 1} onChange={(e) => setId(e.target.value)} required />
                    <label>Matricule</label>
                    <input className="block w-full p-2 border border-gray-300 rounded" type="number" placeholder="Matricule" value={matricule} onChange={(e) => setMatricule(e.target.value)} required />
                    <label>Nom</label>
                    <input className="block w-full p-2 border border-gray-300 rounded" type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
                    <label>Ville</label>
                    <input className="block w-full p-2 border border-gray-300 rounded" type="text" placeholder="Ville" value={ville} onChange={(e) => setVille(e.target.value)} required />
                    <label>Code postal</label>
                    <input className="block w-full p-2 border border-gray-300 rounded" type="number" placeholder="Code Postale" value={codePostale} onChange={(e) => setCodePostale(e.target.value)} required />
                    <label>Moyennes</label>
                    <input className="block w-full p-2 border border-gray-300 rounded" type="number" placeholder="Moyennes" value={moyennes} onChange={(e) => setMoyennes(e.target.value)} required />
                    
                    <button type="submit" onClick={Ajouter} className="px-4 py-2 mr-6 bg-blue-500 text-white rounded hover:bg-blue-600">Ajouter</button>
                    <button className="px-4 py-2 bg-green-500 mr-6 text-white rounded hover:bg-green-600" type="button" onClick={(e) => handleUpdate(id)}>Update</button>
                    <button className="px-4 mr-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600" type="button" onClick={Vider}>Vider</button>
                    <button
                        className="px-4 mr-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        type="button"
                        onClick={filterNomVille}
                    >filter</button>
                    <button className="px-4 mr-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600" type="button" onClick={clearFilter}>initialiser recherche</button>
                </form>
                <ul className="flex flex-col items-center rounded-lg bg-gray-300 mx-10 w-5/12">
                    {students2.map((item, index) => (
                        <li className="flex justify-center items-center bg-sky-200 py-4 px-2 rounded-md my-4 w-10/12 text-lg " key={index}>{item.id} {item.matricule} {item.nom} {item.ville} {item.codePostale} {item.moyennes}</li>
                    ))}
                </ul>
            </div>
            <table className="w-full my-6 border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border p-2 bg-gray-200">ID</th>
                        <th className="border p-2 bg-gray-200">Matricule</th>
                        <th className="border p-2 bg-gray-200">Nom</th>
                        <th className="border p-2 bg-gray-200">Ville</th>
                        <th className="border p-2 bg-gray-200">Code Postale</th>
                        <th className="border p-2 bg-gray-200">Moyennes</th>
                        <th className="border p-2 bg-gray-200" colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((item, index) => (
                        <tr key={index} className="text-center hover:bg-gray-200 cursor-pointer" onClick={() => {
                            setId(item.id)
                            setMatricule(item.matricule)
                            setNom(item.nom)
                            setVille(item.ville)
                            setCodePostale(item.codePostale)
                            setMoyennes(item.moyennes)
                        }
                        }>
                            <td className="border p-2">{item.id}</td>
                            <td className="border p-2">{item.matricule}</td>
                            <td className="border p-2">{item.nom}</td>
                            <td className="border p-2">{item.ville}</td>
                            <td className="border p-2">{item.codePostale}</td>
                            <td className="border p-2">{item.moyennes}</td>
                            <td className="border py-1"><button className="text-red-600 text-lg hover:text-white hover:bg-red-400 py-4 px-6 rounded-lg" type="button" onClick={(e) => handleDelete(item.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ color: "red" }}>{msg}</div>
            <ul className="mt-6">
                <li className="bg-green-200 p-4 my-4 text-lg font-semibold rounded-md">La moyenne la plus eleves: {moyEleve}</li>
                <li className="bg-red-200 my-4 text-lg font-semibold p-4 rounded-md">La moyenne la moins eleves: {moyMoins}</li>
                <li className="bg-sky-200 text-lg font-semibold my-4 p-4 rounded-md">La moyenne general: {moyGaneral}</li>
            </ul>
        </div>
    )
}

export default App;