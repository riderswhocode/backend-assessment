
const Options = ({ optionData }) => {
    console.log(optionData)
    return (
        <label key={optionData}>
            <input type='radio' name="anwer" value={optionData}/>
            {optionData}
        </label>

    )
}

export default Options