import { Box, Button, Heading, Icon, Input } from "@chakra-ui/react"
import { useState } from "react"
import { BiArrowBack } from "react-icons/all"
import { useNavigate } from "react-router-dom"

export function PatientDetail() {

    const navigate = useNavigate()
    const patientsStorage = import.meta.env.VITE_REACT_APP_LOCALSTORAGE_PATIENTS_LIST
    const [name, setName] = useState("")

    const getPatientList = () => {
        let itens: string | null = localStorage.getItem(patientsStorage)
        let itensAux = JSON.parse(itens || "[]")
        return itensAux
    }

    const handleAddPatient = () => {
        let obj = {
            id: generatePatientId(),
            nome: name,
            dataNascimento: "05/11/1997",
            cpf: "44534993889",
            sexo: "masculino",
            endereco: "Ricardo Pelizaro, 41, Cristais Paulista - SP",
            ativo: true
        }
        
        localStorage.setItem(patientsStorage, JSON.stringify([...getPatientList(), obj]))
        navigate(-1)
    }

    const generatePatientId = () => {
        let patientList = getPatientList()
        if(!patientList.length) 
            return 1
        return patientList.length + 1
    }

    return (
        <Box p="12">
            <Heading
                size="sm"
                as="h3"
            >
                Cadastro de Paciente
            </Heading>
            <Box
                w="100%"
                display="flex"
                justifyContent="flex-end"
            >
                <Button
                    colorScheme="blue"
                    onClick={() => {
                        navigate(-1)
                    }}
                >
                    <Icon as={BiArrowBack} />
                </Button>
            </Box>
            <Box p={3}>
                <Input 
                    placeholder='Nome'
                    value={name}
                    onChange={(e: any ) => setName(e.target.value)} 
                />
                <Button
                    onClick={handleAddPatient}
                >
                    Cadastrar
                </Button>
            </Box>
        </Box>
    )
}