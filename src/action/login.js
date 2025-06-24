const islogin = (id) => {
    return {
        type: 'islogin',
        id: id
    }
}
const islogout = () => {
    return {
        type: 'islogout'
    }
}
export { islogin, islogout };