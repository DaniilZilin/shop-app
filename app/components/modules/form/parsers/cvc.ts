const cvcCode = (value: string) => {
    if (!value) {
        return value
    }
    const cvcCode = value.replace(/[^\d]/g, '')

    return `${cvcCode.slice(0,3)}`
}

export default cvcCode