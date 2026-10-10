import{create} from "zustand"
const useConversation=create((set)=>({
    selectedconversation:null,
    setselectedconversation:(selectedconversation)=>set({selectedconversation}),
    messages:[],
   setmesage: (messages) =>
        set((state) => ({
            messages:
                typeof messages === "function"
                    ? messages(state.messages)
                    : messages
        }))

}))
export default useConversation