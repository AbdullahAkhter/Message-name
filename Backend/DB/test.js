const [userInput, setUserInput] = useState({});
    const [loading, setloading] = useSate(false);
    const handleInput = (e) => {
        setUserInput({ ...userInput, [e.target.id]: e.target.value })
        console.log(`userinput is ${userInput}`)
    }
    const handleSubmit = async (e) => {

        setloading(true)
        try {
            const login = await axios.post('/api/auth/login', userInput)
            const data = res.data;
            if (data.success === false) {
                setloading(false);
                console.log(data.message)


            }
            toast.succes(data.message)
            {/*localStorage.setItem('chatapp',JSON.stringify(data));*/ }
            setloading(false);

        } catch (error) {
            console.log(`error ocur :${error}`)
        }
    }