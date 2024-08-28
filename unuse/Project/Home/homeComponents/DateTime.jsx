import { format } from 'date-fns';

const DateTime = () => {

    let time = new Date().toLocaleTimeString()
    let date = new Date().toLocaleDateString()
    const [currentTime, setCurrentTime] = useState(time)
    const [currentDate, setCurrentDate] = useState(date)
    const updateTime = () => {
        let time = new Date().toLocaleTimeString()
        setCurrentTime(time)
        setTimeout(updateTime, 1000)
    }
    const updateDate = () => {
        let currentDate = new Date();
        let remainingMilliseconds = 24 * 60 * 60 * 1000 - (currentDate.getTime() % (24 * 60 * 60 * 1000));
        setTimeout(updateDate, remainingMilliseconds); // Gọi lại updateDate vào thời điểm cuối cùng của ngày
        setCurrentDate(currentDate.toLocaleDateString());
    };
    useEffect(() => {
        updateTime(); // Bắt đầu cập nhật thời gian
        updateDate(); // Bắt đầu cập nhật ngày
    }, [])

    return (
        <div className="dateTime">
            <FontAwesomeIcon icon={faCalendarDays} />
            <span className="clock me-5">{format(currentDate, "dd/MM/yyyy")}</span>
            <FontAwesomeIcon icon={faClock} />
            <span className="clock">{currentTime}</span>
        </div>
    )
}

export default DateTime