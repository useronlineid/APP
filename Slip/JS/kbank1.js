window.onload = function() {
    setCurrentDateTime();
    updateDisplay();
};

function setCurrentDateTime() {
    const now = new Date();
    const localDateTime = now.toLocaleString('sv-SE', { timeZone: 'Asia/Bangkok', hour12: false });
    const formattedDateTime = localDateTime.replace(' ', 'T');
    document.getElementById('datetime').value = formattedDateTime;
}

function formatDate(date) {
    const options = { day: 'numeric', month: 'short', year: '2-digit' };
    let formattedDate = new Date(date).toLocaleDateString('th-TH', options);
    formattedDate = formattedDate.replace(/ /g, ' ').replace(/\./g, '');
    const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const day = formattedDate.split(' ')[0];
    const month = months[new Date(date).getMonth()];
    const year = formattedDate.split(' ')[2];
    return `${day} ${month} ${year}`;
}

function generateUniqueID() {
    const now = new Date(document.getElementById('datetime').value);
    const startDate = new Date("2024-07-24");
    const dayDifference = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const uniqueDay = (14206 + dayDifference).toString().padStart(6, '0'); // เพิ่มตามจำนวนวันตั้งแต่วันที่ 24/07/2567
    const timePart = `${padZero(now.getHours())}${padZero(now.getMinutes())}`;
    const randomPart = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    const randomPart1 = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
    return `${uniqueDay}${timePart}${randomPart}BOR${randomPart1}`;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

function updateDisplay() {
    const sendername = document.getElementById('sendername').value || '-';
    const senderaccount = document.getElementById('senderaccount').value || '-';
    const receivername = document.getElementById('receivername').value || '-';
    const receiveraccount = document.getElementById('receiveraccount').value || '-';
    const bank = document.getElementById('bank').value || '-';
    const amount11 = document.getElementById('amount11').value || '-';
    const datetime = document.getElementById('datetime').value || '-';
    const selectedImage = document.getElementById('imageSelect').value || '';
    const backgroundSelect = document.getElementById('backgroundSelect').value || '';
    const QRCode = document.getElementById('QRCode').value || '';

    let bankLogoUrl = '';
    switch (bank) {
        case 'ธ.กสิกรไทย':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/KBANK.png?raw=true';
            break;
        case 'ธ.กรุงไทย':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/KTB.png?raw=true';
            break;
        case 'ธ.กรุงเทพ':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/BBL.png?raw=true';
            break;
        case 'ธ.ไทยพาณิชย์':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/SCB.png?raw=true';
            break;
        case 'ธ.กรุงศรีอยุธยา':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/BAY.png?raw=true';
            break;
        case 'ธ.ทหารไทยธนชาต':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/TTB1.png?raw=true';
            break;
        case 'ธ.ออมสิน':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/O.png?raw=true';
            break;
        case 'ธ.ก.ส.':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/T.png?raw=true';
            break;
        case 'ธ.อาคารสงเคราะห์':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/C.png?raw=true';
            break;
        case 'ธ.เกียรตินาคินภัทร':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/K.png?raw=true';
            break;
        case 'ธ.ซีไอเอ็มบีไทย':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/CIMB.png?raw=true';
            break;
        case 'ธ.ยูโอบี':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/UOB.png?raw=true';
            break;
        case 'ธ.แลนด์ แอนด์ เฮาส์':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/LHBANK.png?raw=true';
            break;
        case 'ธ.ไอซีบีซี':
            bankLogoUrl = 'https://github.com/useronlineid/Theslipcame/blob/main/ICBC.png?raw=true';
            break;
    }

    const formattedDate = formatDate(datetime);
    const formattedTime = new Date(datetime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Load background image
    const backgroundImage = new Image();
    backgroundImage.src = backgroundSelect;
    backgroundImage.onload = function() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background image
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        // Draw bank logo
        const bankLogo = new Image();
        bankLogo.src = bankLogoUrl;
        bankLogo.onload = function() {
            ctx.drawImage(bankLogo, 34.6, 526.7, 157, 157); // Adjust position and size as needed
            
            // Draw text with custom styles
            drawText(ctx, `${formattedDate}  ${formattedTime} น.`, 69.8, 136.6, '37.5px Sukhumvit Set', '#4e4e4e', '600', 'left', 1.5, 3, 0, 0, 500, 0);

            drawText(ctx, `${sendername}`, 238.9, 272.0, '39.3px Sukhumvit Set', '#4e4e4e', '600', 'left', 1.5, 3, 0, 0, 500, 0);
            drawText(ctx, `ธ.กสิกรไทย`, 238.9, 333.6, '37.5px Sukhumvit Set', '#545454', '500', 'left', 1.5, 2, 0, 0, 500, 0);
            drawText(ctx, `${senderaccount}`, 238.9, 392.5, '37.5px Sukhumvit Set', '#545454', '500', 'left', 1.5, 1, 0, 0, 500, 0.25);
            
            drawText(ctx, `${receivername}`, 238.9, 577.0, '39.3px Sukhumvit Set', '#4e4e4e', '600', 'left', 1.5, 3, 0, 0, 500, 0);
            drawText(ctx, `${bank}`, 238.9, 639.0, '37.5px Sukhumvit Set', '#545454', '500', 'left', 1.5, 2, 0, 0, 500, 0);
            drawText(ctx, `${receiveraccount}`, 238.9, 697.7, '37.5px Sukhumvit Set', '#545454', '500', 'left', 1.5, 1, 0, 0, 500, 0.25);
            
            drawText(ctx, `${generateUniqueID()}`, 370.9, 885.4, '35.63px Sukhumvit Set', '#575757', '500', 'right', 1.5, 3, 0, 0, 500, 0);
            drawText(ctx, `${amount11}  บาท`, 370.9, 1003.6, '38.44px Sukhumvit Set', '#4b4b4b', '600', 'right', 1.5, 3, 0, 0, 500, 0);
            drawText(ctx, `0.00  บาท`, 370.9, 1124.2, '38.44px Sukhumvit Set', '#4b4b4b', '600', 'right', 1.5, 3, 0, 0, 500, 0);
            drawText(ctx, `${QRCode}`, 238.9, 599.0, '33px Kanit', '#4e4e4e', '500', 'left', 1.5, 5, 0, 0, 500, 0);
            drawImage(ctx, 'https://github.com/useronlineid/Theslipcame/blob/main/KBANK.png?raw=true', 34.6, 222, 157, 157);  
        
          
            // Draw the selected image
            if (selectedImage) {
                const customImage = new Image();
                customImage.src = selectedImage;
                customImage.onload = function() {
                    ctx.drawImage(customImage, 0, 0, 842, 1200); // Adjust the position and size as needed
                }
            }
            //ถึงที่นี่
            
            
        }
    }
}

function drawText(ctx, text, x, y, font, color, weight, align, lineHeight, maxLines, shadowColor, shadowBlur, maxWidth, letterSpacing) {
    ctx.font = `${weight} ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = 'left'; // Always use left alignment for drawing text with custom letterSpacing
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;

    const paragraphs = text.split('<br>');
    let currentY = y;

    paragraphs.forEach(paragraph => {
        const words = paragraph.split(' ');
        let currentLine = '';
        const lines = [];

        for (let i = 0; i < words.length; i++) {
            const testLine = currentLine + words[i] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width + (testLine.length - 1) * letterSpacing;

            if (testWidth > maxWidth && i > 0) {
                lines.push(currentLine);
                currentLine = words[i] + ' ';
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);

        lines.forEach((line, index) => {
            let currentX = x;
            if (align === 'center') {
                currentX = (ctx.canvas.width - ctx.measureText(line).width) / 2 - ((line.length - 1) * letterSpacing) / 2;
            } else if (align === 'right') {
                currentX = ctx.canvas.width - x - ctx.measureText(line).width - ((line.length - 1) * letterSpacing);
            }

            drawTextLine(ctx, line.trim(), currentX, currentY, letterSpacing);
            currentY += lineHeight;
            if (maxLines && index >= maxLines - 1) {
                return;
            }
        });
    });
}

function drawTextLine(ctx, text, x, y, letterSpacing) {
    if (!letterSpacing) {
        ctx.fillText(text, x, y);
        return;
    }

    const characters = text.split('');
    let currentPosition = x;

    characters.forEach((char, index) => {
        const charCode = char.charCodeAt(0);
        const prevChar = index > 0 ? characters[index - 1] : null;
        const prevCharCode = prevChar ? prevChar.charCodeAt(0) : null;

        const isUpperVowel = (charCode >= 0x0E34 && charCode <= 0x0E37);
        const isToneMark = (charCode >= 0x0E48 && charCode <= 0x0E4C);
        const isBeforeVowel = (charCode === 0x0E31);
        const isBelowVowel = (charCode >= 0x0E38 && charCode <= 0x0E3A);

        let yOffset = 0;
        let xOffset = 0;

        if (isUpperVowel) {
            yOffset = 1;
            xOffset = -1;
        }

        if (isToneMark) {
            if (prevChar && ((prevChar.charCodeAt(0) >= 0x0E34 && prevChar.charCodeAt(0) <= 0x0E37) || prevChar.charCodeAt(0) === 0x0E31)) {
                yOffset = -8; // วรรณยุกต์ที่มีสระ เลื่อนขึ้น 8 หน่วย
                xOffset = -5; // เลื่อนในแนวนอน ซ้าย 5 หน่วย
            } else {
                yOffset = -0; // วรรณยุกต์ไม่มีสระ เลื่อนขึ้น 8 หน่วย
                xOffset = -9; // เลื่อนในแนวนอน ซ้าย 5 หน่วย
            }
        }

        if (isBeforeVowel) {
            yOffset = 0;
            xOffset = -8;
        }

        if (isBelowVowel) {
            yOffset = 0;
            xOffset = -4;
        }

        ctx.fillText(char, currentPosition + xOffset, y + yOffset);

        if (!isToneMark && !isBeforeVowel && !isBelowVowel) {
            currentPosition += ctx.measureText(char).width + letterSpacing;
        } else {
            currentPosition += ctx.measureText(char).width;
        }
    });
}


document.getElementById('generate').addEventListener('click', updateDisplay);

function drawImage(ctx, imageUrl, x, y, width, height) {
    const image = new Image();
    image.src = imageUrl;
    image.onload = function() {
        ctx.drawImage(image, x, y, width, height);
    };
}
