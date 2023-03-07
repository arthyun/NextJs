import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";


const Navbar = () => {
    const router = useRouter();
    //react router와는 다르게 Link태그는 경로만 지정가능하며 추가 속성을 이용하려면 Link안에 a태그를 지정해야한다.
    return (
        <nav>
            <img src="/vercel.svg" alt="logo" />

        {/* Link 구버전 */}
        {/* <Link href='/'>
            <a style={{color: 'red'}}>Home</a>
        </Link>
        <Link href='/about'>
            <a style={{color: 'blue'}}>About</a>
        </Link> */}

        {/* Link 신버전 */}
        {/* <Link href='/' style={{color: router.pathname === "/" ? "yellow" : "#fff"}}>Home</Link>
        <Link href='/about' style={{color: router.pathname === "/about" ? "yellow" : "#fff"}}>About</Link> */}

        {/* 클래스 2개 이상 추가 시 콤마 사용하지 않기 */}
        {/* <Link href='/' className={`${styles.link1} ${router.pathname === "/" ? styles.active : ""}`}>Home</Link>
        <Link href='/about' className={`${styles.link2} ${router.pathname === "/about" ? styles.active : ""}`}>About</Link> */}
        
        {/* 또다른 style 입히는 방법(추천) */}
        {/* Next 신버전에서의 문제는 legacyBehavior를 추가하거나 a태그 대신 span태그를 이용할 것 */}
        <div>
        <Link href='/' legacyBehavior>
            <span className={router.pathname === "/" ? "active" : ""}>Home</span>
        </Link>
        <Link href='/about' legacyBehavior>
            <a className={router.pathname === "/about" ? "active" : ""}>About</a>
        </Link>
        </div>
        <style jsx>
            {`
                nav {
                    display: flex;
                    gap: 10px;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 20px;
                    padding-bottom: 10px;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
                    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
                }
                img {
                    max-width: 100px;
                    margin-bottom: 5px;
                }
                nav span, nav a {
                    font-weight: 600;
                    font-size: 18px;
                }
                .active {
                    color: tomato;
                }
                nav div {
                    display: flex;
                    gap: 10px;
                }
            `}
        </style>
        </nav>
    )
}
export default Navbar;