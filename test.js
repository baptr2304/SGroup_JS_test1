const fs = require('fs').promises
const { read } = require('fs')
const readline = require('readline')
const listStudents = []
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function questionAsync(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
}


async function askQuestions() {
    const student = {};

    student.name = await questionAsync('Tên: ');
    console.log('Bạn đã nhập:', student.name);

    student.age = await questionAsync('Tuổi: ');
    console.log('Bạn đã nhập:', student.age);

    student.title = await questionAsync('Title: ');
    console.log('Bạn đã nhập:', student.title);

    listStudents.push(student);
}

async function showStudents() {
    console.log('Danh sách sinh viên:');
    
    for (const student of listStudents) {
        console.log(`${student.name} --- ${student.age} --- ${student.title}`);
    }

}

async function searchStudents() {
    const keyword = await questionAsync('Nhập từ khóa cần tìm: ');

    const result = listStudents.filter((student) => {
        return student.name.toLowerCase().includes(keyword.toLowerCase());
    });

    console.log('Kết quả tìm kiếm:');

    for (const student of result) {
        console.log(`${student.name} --- ${student.age} --- ${student.title}`);
    }
}

async function main() {
    let exit = false;

    while (!exit) {
        const choice = await questionAsync(`
            -- Quan ly sinh vien --
            1. Nhập thông tin sinh viên
            2. Hiển thị danh sách sinh viên
            3. Tìm kiếm sinh viên
            4. Thoát 
            Nhập lựa chọn của bạn: `);
        switch (choice) {
            case '1':
                await askQuestions();
                break;
            case '2':
                await showStudents();
                break;
            case '3':
                await searchStudents();
                break;
            case '4':
                exit = true;
                break;
            default:
                console.log('Lựa chọn không hợp lệ!!!');
                break;
        }

    }

    rl.close();
}

main();

rl.on('close', async () => {
    console.log('Đã đóng terminal.');
    try {
        await fs.writeFile('listStudent.txt', listStudents.map(x => {
            return x.name + ',' + x.age + ',' + x.title + '\n';
        }));
    } catch (error) {
        console.error('Error writing to file:', error);
    }
});
