function DisplayPage() {
    return (
        <div>
            <h2>화면 테마 설정하기</h2>
            <div className="mt-[1.1875rem] flex flex-col items-start gap-[0.6875rem] pl-[1.375rem] text-sm text-[#F5F5F5]">
                <button type="button" className="">
                    light / dark 테마
                </button>
                <button type="button" className="">
                    사용자 설정 색상 선택하기
                </button>
            </div>
        </div>
    );
}

export default DisplayPage;
