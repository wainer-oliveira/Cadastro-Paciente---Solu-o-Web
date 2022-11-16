import { Box,
     Button,
     FormControl,
     FormLabel,
     Heading,
     HStack,
     Icon,
     Input,
     Radio,
     RadioGroup} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { BiArrowBack } from "react-icons/all"
import { useNavigate } from "react-router-dom"
import { IMaskInput } from "react-imask";

export function PatientDetail() {
    const navigate = useNavigate()
    const patientsStorage = import.meta.env.VITE_REACT_APP_LOCALSTORAGE_PATIENTS_LIST
    const [name, setName] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [cpf, setCpf] = useState("")
    const [sexo, setSexo] = useState("")
    // const [endereco, setEndereco] = useState("")

    const masks = {
        cpf: "000.000.000-00",
        cep: "00000-000",
        UF: "aa"
    }

    const getPatientList = () => {
        let itens: string | null = localStorage.getItem(patientsStorage)
        let itensAux = JSON.parse(itens || "[]")
        return itensAux
    }

    const generatePatientId = () => {
        let patientList = getPatientList()
        if (!patientList.length)
            return 1
        return patientList.length + 1
    }

    const formatBirthDatePatient = (date: string) => {
        const ano = date.slice(0, 4)
        const mes = date.slice(5, 7)
        const dia = date.slice(8, 10)
        return `${dia}/${mes}/${ano}`
    }

    const handleAddPatient = () => {
        let obj = {
            id: generatePatientId(),
            nome: name,
            dataNascimento: formatBirthDatePatient(dataNascimento),
            cpf: cpf,
            sexo: sexo,
            // endereco: endereco,
            ativo: true
        }
        localStorage.setItem(patientsStorage, JSON.stringify([...getPatientList(), obj]))
        navigate(-1)
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
                <FormControl isRequired>
                    <FormLabel as='legend'>Nome</FormLabel>
                    <Input
                        w={'70%'}
                        value={name}
                        onChange={(e: any) => setName(e.target.value)}
                    />
                    <HStack>
                        <Box p={3}>
                        <FormLabel as='legend'>Data de Nascimento</FormLabel>
                        <Input
                            isRequired
                            type="date"
                            value={dataNascimento}
                            onChange={(e: any) => setDataNascimento(e.target.value)                           }
                        />
                        </Box>
                        <Box p={3}>
                            <FormLabel as='legend'>CPF</FormLabel>
                            <Input
                                as={IMaskInput}
                                mask={masks.cpf}
                                value={cpf}
                                onChange={(e: any) => { setCpf(e.target.value)
                                    // const patientCpf = cpfMask(e.target.value)
                                    // setCpf(patientCpf)
                                }}
                            />
                        </Box>
                    </HStack>
                    <FormLabel as='legend'>Sexo</FormLabel>
                    <RadioGroup
                        value={sexo}
                        onChange={setSexo}
                    >
                        <HStack>
                            <Radio mr={3} value="masculino" >Masculino</Radio>
                            <Radio mr={3} value="feminino">Feminino</Radio>
                            <Radio mr={3} value="outro">Outro</Radio>
                        </HStack>
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <Box>
                        <FormLabel>CEP</FormLabel>
                        <Input
                          as={IMaskInput}
                          mask={masks.cep}
                          placeholder="Digite se CEP"
                          onChange= {(e: any) => {
                            console.log(e.target.value)
                          }}
                        />    
                    </Box>
                    <Box>
                        <FormLabel>Rua</FormLabel>
                        <Input
                          placeholder="Rua"
                          onChange= {(e: any) => {
                            console.log(e.target.value)
                          }}
                        />    
                    </Box>
                    <Box>
                        <FormLabel>Cidade</FormLabel>
                        <Input
                          placeholder="Cidade"
                          onChange= {(e: any) => {
                            console.log(e.target.value)
                          }}
                        />    
                    </Box>
                    <Box>
                        <FormLabel>UF</FormLabel>
                        <Input
                          as={IMaskInput}
                          mask={masks.UF}
                          placeholder="UF"
                          onChange= {(e: any) => {
                            console.log((e.target.value).toUpperCase())
                          }}
                        />    
                    </Box>
                </FormControl>

                <Box p={3}>
                </Box>
                <Button
                    onClick={handleAddPatient}
                >
                    Cadastrar
                </Button>
            </Box>
        </Box>
    )
}