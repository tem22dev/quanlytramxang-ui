import { PacmanLoader } from 'react-spinners';

function Loading() {
    return (
        <div className="fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]">
            <PacmanLoader color="#36d7b7" />
        </div>
    );
}

export default Loading;
