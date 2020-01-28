import wework from '../../asset/wework.jpg'
import style from '../scss/index.scss'
function createAvatar(){
    var img = new Image();
    img.src = wework;
    img.classList.add(style.wework)

    var root = document.getElementById('root')
    root.append(img)
}
export default createAvatar;