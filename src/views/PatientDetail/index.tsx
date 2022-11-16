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
import { useNavigate, useParams } from "react-router-dom"
import { IMaskInput } from "react-imask";

export function PatientDetail() {
    const navigate = useNavigate()
    const {id}= useParams()
    const patientsStorage = import.meta.env.VITE_REACT_APP_LOCALSTORAGE_PATIENTS_LIST
    const [name, setName] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [cpf, setCpf] = useState("")
    const [sexo, setSexo] = useState("")
    const [cep, setCep] = useState("")
    const [cidade, setCidade] = useState("")
    const [uf, setUf] = useState("")
    const [rua, setRua] = useState("")
    const [numeroCasa, setNumeroCasa] = useState("")
    const [registrationPatient, setRegistrationPatient] = useState(false)

    useEffect( () => {
        loadData()
    }, [])

    const loadData = () => {
        if(id && id !== 'new'){
            const data: string | null = localStorage.getItem(patientsStorage)
            const patient = (JSON.parse(data || "[]")).find((item: any) => item.id == id)
            if(patient){
                setName(patient.name)
                setDataNascimento(patient.dataNascimento)
                setCpf(patient.cpf)
                setSexo(patient.sexo)
                setCep(patient.cep)
                setCidade(patient.cidade)
                setUf(patient.uf)
                setRua(patient.rua)
                setNumeroCasa(patient.numeroCasa)
            }
        }
    }

    const validatePatient = () => {
        if(!name) {
            setRegistrationPatient(true)
            return
        }
        if(!dataNascimento) {
            setRegistrationPatient(true)
            return
        }
        if(!cpf) {
            setRegistrationPatient(true)
            return
        }
        if(!sexo) {
            setRegistrationPatient(true)
            return
        }
        handleAddPatient()
    }

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

    const handleAddPatient = () => {
        let obj: any = {
            name: name,
            dataNascimento: dataNascimento,
            cpf: cpf,
            sexo: sexo,
            endereco: `${cep}, ${cidade}-${uf}, ${rua}, ${numeroCasa}`,
            cep: cep,
            cidade: cidade,
            uf: uf,
            rua: rua,
            numeroCasa: numeroCasa,
            ativo: true
        }
        if(id == 'new'){
            obj["id"] = generatePatientId()
            localStorage.setItem(patientsStorage, JSON.stringify([...getPatientList(), obj]))
        } else{
            obj["id"] = id
            let patients = getPatientList()
            const pos = patients.map((item: any) => item.id).indexOf(parseInt(id || ''))
            patients[pos] = obj
            localStorage.setItem(patientsStorage, JSON.stringify(patients))
        }
        navigate(-1)
    }

    return (
        <Box p="12">
            <Heading
                size="sm"
                as="h3"
            >
                {id == 'new' ? 'Cadastro' : 'Atualização'} de Paciente
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
                <FormControl isInvalid={registrationPatient}>
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
                <FormControl 
                    p={3}
                >
                    <FormLabel as='legend'>Endereço</FormLabel>
                    <HStack>
                        <Box p={3} w={'15%'}>
                            <FormLabel>CEP</FormLabel>
                            <Input
                              as={IMaskInput}
                              mask={masks.cep}
                              value={cep}
                              placeholder="Digite se CEP"
                              onChange= {(e: any) => setCep(e.target.value)}
                            />    
                        </Box>
                        <Box p={3} w={'30%'}>
                            <FormLabel>Cidade</FormLabel>
                            <Input
                                value={cidade}
                              placeholder="Cidade"
                              onChange= {(e: any) => setCidade(e.target.value)}
                            />    
                        </Box>
                        <Box p={3} w={'10%'}>
                            <FormLabel>UF</FormLabel>
                            <Input
                              as={IMaskInput}
                              mask={masks.UF}
                              value={uf}
                              placeholder="UF"
                              onChange= {(e: any) => setUf((e.target.value).toUpperCase())}
                            />    
                        </Box>
                    </HStack>
                    <HStack>
                        <Box p={3} w={'70%'}>
                            <FormLabel>Rua</FormLabel>
                            <Input
                              placeholder="Rua"
                              value={rua}
                              onChange= {(e: any) => setRua(e.target.value)}
                            />    
                        </Box>
                        <Box p={3} w={'15%'}>
                            <FormLabel>Número</FormLabel>
                            <Input
                              type={'number'}
                              placeholder="Nº"
                              value={numeroCasa}
                              onChange= {(e: any) => setNumeroCasa(e.target.value)}
                            />    
                        </Box>
                    </HStack>
                </FormControl>

                <Box p={3}>
                </Box>
                <Button
                    onClick={validatePatient}
                    bg='green'
                    color='white'
                >
                    {id == 'new' ? 'Cadastrar' : 'Atualizar'}
                </Button>
            </Box>
        </Box>
    )
}