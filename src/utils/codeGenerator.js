export default function createCode() {
    var result           = '';
    var characters       = "0123456789";
    var charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}