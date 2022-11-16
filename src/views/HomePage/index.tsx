import { Box, Button, Icon, Heading, InputGroup, Input, InputRightElement } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Table } from "react-chakra-pagination"
import { FiMoreHorizontal, FiEdit2, FiTrash2, AiOutlinePlus, AiOutlineSearch } from "react-icons/all"
import { useNavigate } from "react-router-dom"

export function HomePage() {
    const navigate = useNavigate()
    const patientsStorage = import.meta.env.VITE_REACT_APP_LOCALSTORAGE_PATIENTS_LIST
    const [page, setPage] = useState(1)
    const [patients, setPatients] = useState<any[]>([])
    const [filterName, setFilterName] = useState('')

    useEffect(() => {
        const getPatientsFromStorage = async () => {
            const data: string | null = localStorage.getItem(patientsStorage)
            setPatients(JSON.parse(data || "[]"))
        }
        getPatientsFromStorage()
    }, [])

    const tableColumns = [
        {
            Header: "Nome",
            accessor: "name" as const
        },
        {
            Header: "Data de Nascimento",
            accessor: "dataNascimento" as const
        },
        {
            Header: "CPF",
            accessor: "cpf" as const
        },
        {
            Header: "Sexo",
            accessor: "sexo" as const
        },
        {
            Header: "Endereço",
            accessor: "endereco" as const
        },
        {
            Header: "",
            accessor: "action" as const
        }
    ]

    const handleDeletePatient = (patient: any, index: number) => {
        patient.ativo = false
        localStorage.setItem(patientsStorage, JSON.stringify(patients.map(item => {
            if (patient.id == item.id) return patient
            return item
        })))

        setPatients(patients.map(item => {
            if (patient.id == item.id) return patient
            return item
        }))
    }

    const formatBirthDatePatient = (date: string) => {
        const ano = date.slice(0, 4)
        const mes = date.slice(5, 7)
        const dia = date.slice(8, 10)
        return `${dia}/${mes}/${ano}`
    }

    const tableData =
        patients
            .filter(item => item.ativo && item.name.toLowerCase()
                .includes(filterName.toLowerCase()))
            .map((patient: any, index: number) => ({
                name: patient?.name,
                dataNascimento: formatBirthDatePatient(patient?.dataNascimento),
                cpf: patient?.cpf,
                sexo: patient?.sexo,
                endereco: patient?.endereco,
                action: (
                    <>
                        <Button
                            colorScheme={"yellow"}
                            onClick={() => navigate(`/patient/${patient.id}`)}
                            size="sm"
                        >
                            <Icon
                                as={FiEdit2}
                                fontSize={20}
                                color="#000"
                            />
                        </Button>{" "}
                        <Button
                            colorScheme={"red"}
                            onClick={() => handleDeletePatient(patient, index)}
                            size="sm"
                        >
                            <Icon
                                as={FiTrash2}
                                fontSize={20}
                                color="#000"
                            />
                        </Button>
                    </>
                )
            }))

    return (
        <Box p="12">
            <Heading
                size="sm"
                as="h3"
            >
                Lista de Pacientes
            </Heading>
            <Box
                w="100%"
                display="flex"
                justifyContent="flex-end"
            >
                <Button
                    colorScheme="green"
                    onClick={() => {
                        navigate("/patient/new")
                    }}
                >
                    <Icon as={AiOutlinePlus} />
                </Button>
            </Box>
            <Box p={3} w={'30%'}>
                <InputGroup>
                    <Input
                        placeholder="Nome"
                        _placeholder={{ opacity: 1, color: 'black' }}
                        onChange={(e: any) => setFilterName(e.target.value)}
                    />
                    <InputRightElement
                        children={<AiOutlineSearch />}
                    />
                </InputGroup>
            </Box>
            <Box mt="8">
                <Table
                    colorScheme="blue"
                    emptyData={{
                        icon: FiMoreHorizontal,
                        text: "Não existem usuários cadastrados."
                    }}
                    totalRegisters={patients.length}
                    page={page}
                    onPageChange={(page: number) => setPage(page)}
                    columns={tableColumns}
                    data={tableData}
                />
            </Box>
        </Box>
    )

}