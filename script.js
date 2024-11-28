// Função para adicionar um aluno à lista
document.getElementById('attendanceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const studentName = document.getElementById('studentName').value.trim();
    
    if (studentName) {
        // Adiciona aluno à lista visualmente
        addStudentToList(studentName);
        
        // Gera QR Code para o aluno
        generateQrCode(studentName);

        // Salva aluno no LocalStorage
        saveStudent(studentName);

        // Limpa o campo de input
        document.getElementById('studentName').value = '';
    }
});

// Função para adicionar aluno à lista visualmente
function addStudentToList(name) {
    const attendanceList = document.getElementById('attendanceList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${name}</span>
        <button onclick="removeStudent(this, '${name}')">Remover</button>
    `;
    attendanceList.appendChild(listItem);
}

// Função para gerar QR Code para cada aluno
function generateQrCode(name) {
    const qrCodeArea = document.getElementById('qrCodeArea');
    const qrDiv = document.createElement('div');
    QRCode.toCanvas(qrDiv, name, { width: 100 }, function(error) {
        if (error) {
            console.error('Erro ao gerar QR Code:', error);
        }
    });
    qrCodeArea.appendChild(qrDiv);
}

// Função para salvar alunos no LocalStorage
function saveStudent(name) {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(name);
    localStorage.setItem('students', JSON.stringify(students));
}

// Função para remover aluno da lista e do LocalStorage
function removeStudent(button, name) {
    const listItem = button.parentElement;
    listItem.remove();

    const students = JSON.parse(localStorage.getItem('students')) || [];
    const updatedStudents = students.filter(student => student !== name);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
}

// Função para exportar os alunos para um arquivo .txt
document.getElementById('exportButton').addEventListener('click', function() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const textContent = students.join('\n');
    
    // Cria o arquivo TXT e faz o download
    const blob = new Blob([textContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'lista_de_presenca.txt';
    link.click();
});
