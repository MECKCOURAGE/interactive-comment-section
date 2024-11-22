import CommentContextProvider from "./store/Context-provider"
import OnlyPage from "./pages/OnlyPage"
function App() {

  return (
    <CommentContextProvider>
      <div className="md:pt-[55px] pt-[30px]  bg-neutral-lightGray  flex flex-col ">
        <OnlyPage />
      </div>
    </CommentContextProvider>
  )
}

export default App
