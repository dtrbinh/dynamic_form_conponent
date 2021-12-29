let result;
var sections = 0;
var test = {
    title: "Form khảo sát tình hình học tập các thành viên GDSC - DUT",
    description: "Sau một khoảng thời gian hoạt động, GDSC xin được khảo sát các bạn thành viên yêu mến về tình hình học tập và rèn luyện của các bạn tại GDSC.",
    sections: [
        {
            title: "Khảo sát sơ bộ",
            questions: [
                {
                    question: "Bạn tên gì?",
                    type: "SHORT_TEXT",
                    description: null,
                    defaultAnswer: null,
                    required: true
                },
                {
                    question: "Bạn là sinh viên năm mấy?",
                    type: "NUMBER",
                    description: null,
                    defaultAnswer: null,
                    required: true,
                    attrs: {
                        min: 1,
                        max: 7
                    }
                },
                {
                    question: "Các bạn đã tham gia GDSC được bao lâu rồi?",
                    type: "RADIO",
                    description: "Thời gian các bạn tham gia GDSC, tính theo thế hệ (generation)",
                    defaultAnswer: 1,
                    required: true,
                    options: [
                        {
                            text: "1 thế hệ",
                            value: 1
                        },
                        {
                            text: "2 thế hệ",
                            value: 2
                        },
                        {
                            text: "3 thế hệ",
                            value: 3
                        }
                    ]
                },
                {
                    question: "Các bạn tham gia ở phòng ban nào?",
                    type: "RADIO",
                    description: null,
                    defaultAnswer: 1,
                    required: true,
                    options: [
                        {
                            text: "Phòng ban kỹ thuật",
                            value: 1
                        },
                        {
                            text: "Phòng ban quản lý/nhân sự",
                            value: 2
                        },
                        {
                            text: "Phòng ban marketing",
                            value: 3
                        },
                        {
                            text: "Phòng ban sự kiện",
                            value: 3
                        },
                        {
                            text: "Phòng ban kiểm thử",
                            value: 3
                        }
                    ]
                }
            ]
        },
        {
            title: "Khảo sát thêm",
            description: "GDSC là một cộng đồng, một sân chơi, môi trường cho các bạn thoả sức sáng tạo, thể hiện đam mê và học hỏi từ những thành viên thế hệ trước",
            questions: [
                {
                    question: "Hãy nêu cảm nhận của bạn về thời gian vừa qua.",
                    type: "LONG_TEXT",
                    description: "Bạn có cảm thấy thoải mái không? Bạn có cảm thấy vui không? Bạn đã học được gì rồi? Bạn te... được bao nhiêu bug rồi?...hãy nói hết đi...",
                    defaultAnswer: null,
                    required: true,
                    attrs: {
                        minLength: 100,
                        maxLength: 2000
                    }
                }
            ]
        },
        {
            title: "Khảo sát về ý tưởng",
            description: "GDSC có 2 giá trị cốt lõi: đưa công nghệ đến gần với các bạn sinh viên và giải quyết vấn đề địa phương bằng giải pháp công nghệ, vì vậy hãy cùng nhau sáng tạo và xây dựng ý tưởng cho cộng đồng nào!",
            questions: [
                {
                    question: "Tên ý tưởng của bạn?",
                    type: "SHORT_TEXT",
                    description: "Hãy cho chúng mình một cái tên thật cool ngầu nào!",
                    defaultAnswer: null,
                    required: true
                },
                {
                    question: "Mô tả sơ lược ý tưởng của bạn.",
                    type: "LONG_TEXT",
                    description: "Sản phẩm này dùng để làm gì? Nó sẽ giải quyết vấn đề gì hiện nay? Đối tượng sử dụng là ai? ...",
                    defaultAnswer: null,
                    required: true,
                    attrs: {
                        minLength: 100,
                        maxLength: 2000
                    }
                },
                {
                    question: "Giải pháp hiện tại của mọi người, xã hội là như thế nào?",
                    type: "LONG_TEXT",
                    description: null,
                    defaultAnswer: null,
                    required: true,
                    attrs: {
                        minLength: 100,
                        maxLength: 500
                    }
                },
                {
                    question: "Bạn đã tìm hiểu về thị trường, đối thủ chưa?",
                    type: "LONG_TEXT",
                    description: null,
                    defaultAnswer: null,
                    required: true,
                    attrs: {
                        minLength: 100,
                        maxLength: 2000
                    }
                }
            ]
        }
    ]
}
function callAPI() {
    fetch("https://gist.githubusercontent.com/bittermeatball/7854f3d7950469b0203a068fcaf27908/raw/1de87462c4f8c2fd0bfb9d452b246c92697b2eee/sample.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            } else {
                //console.log("Response: ", response);
                return response.json();
            }
        })
        .then((data) => {
            result = data;
            //console.log("Data: ", data);
        })
        .catch(err => {
            console.log("Error: ", err);
        });
}

function fetchData() {
    callAPI();
    //console.log(" Description: ", result.description);
}

function onLoad() {
    fetchData();
    console.log(result);
    document.getElementById('description').innerHTML = result.description;
    document.getElementById('title').innerHTML = result.title;
    document.getElementById('section_title').innerHTML = result.sections[sections].title;
    loadSurvey();
}
function loadSurvey() {
    checkSections();
    createSectionTitle(sections);
    createField(sections);
    sectionsLoaded[sections] = true;
}

