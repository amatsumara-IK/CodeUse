// Функция для загрузки состояния чекбоксов
function loadCheckboxState() {
    document.querySelectorAll('input[data-checkbox]').forEach(checkbox => {
        const state = localStorage.getItem(checkbox.dataset.checkbox);
        checkbox.checked = (state === 'true');
    });
}

// Функция для сохранения состояния чекбоксов
function saveCheckboxState() {
    document.querySelectorAll('input[data-checkbox]').forEach(checkbox => {
        localStorage.setItem(checkbox.dataset.checkbox, checkbox.checked);
    });
}

// Добавляем обработчики событий для чекбоксов
document.querySelectorAll('input[data-checkbox]').forEach(checkbox => {
    checkbox.addEventListener('change', saveCheckboxState);
});

// Загружаем состояние чекбоксов при загрузке страницы
window.addEventListener('DOMContentLoaded', loadCheckboxState);

// Функция для обработки текста с учетом состояния чекбоксов
document.getElementById('transformButton').addEventListener('click', function() {
	let inputText = document.getElementById("inputText").value;

	// Функция для обработки каждого условия
	function processBlocks(
		startPattern,
		endPattern,
		replacementHtml,
		closingTag
	) {
		let resultText = "";
		let currentIndex = 0;

		while (true) {
			const startMatch = inputText
				.slice(currentIndex)
				.match(startPattern);
			if (!startMatch) {
				// Добавляем оставшийся текст после последнего блока
				resultText += inputText.slice(currentIndex);
				break;
			}

			const start = currentIndex + startMatch.index;
			resultText += inputText.slice(currentIndex, start); // Добавляем текст перед блоком

			const afterStartText = inputText.slice(
				start + startMatch[0].length
			);
			const endMatch = afterStartText.match(endPattern);
			if (!endMatch) {
				alert(`Не найден блок $end после ${startPattern}`);
				return;
			}

			const end =
				start +
				startMatch[0].length +
				endMatch.index +
				endMatch[0].length;
			const codeBetween = inputText.slice(
				start + startMatch[0].length,
				start + startMatch[0].length + endMatch.index
			);

			// Вставляем код внутрь replacementHtml и добавляем закрывающий тег
			const newBlock = replacementHtml + codeBetween + closingTag;

			resultText += newBlock;

			// Обновляем текущий индекс для следующего поиска
			currentIndex = end;
		}

		return resultText;
	}

	// Условие 1: $imp
	inputText = processBlocks(
		/<p>\s*<strong>\s*\$imp\s*<\/strong>\s*<\/p>|<strong>\s*\$imp\s*<\/strong>|<p>\s*\$imp\s*<\/p>/,
		/<p>\s*<strong>\s*\$end\s*<\/strong>\s*<\/p>|<strong>\s*\$end\s*<\/strong>|<p>\s*\$end\s*<\/p>/,
		`<div class="color-container container-flex blue-container">
            <div class="container-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M6.99581 3.99658C6.99581 6.20664 5.2042 7.99825 2.99414 7.99825C5.2042 7.99825 6.99581 9.78986 6.99581 11.9999C6.99581 9.78986 8.78741 7.99825 10.9975 7.99825C8.78741 7.99825 6.99581 6.20664 6.99581 3.99658Z"
                        stroke="#D1D0FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M18.0021 16.0017C18.0021 13.2392 15.7626 10.9996 13 10.9996C15.7626 10.9996 18.0021 8.76013 18.0021 5.99756C18.0021 8.76013 20.2416 10.9996 23.0042 10.9996C20.2416 10.9996 18.0021 13.2392 18.0021 16.0017Z"
                        stroke="#D1D0FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M10.9978 14.501C10.9978 16.711 9.20615 18.5026 6.99609 18.5026C9.20615 18.5026 10.9978 20.2942 10.9978 22.5043C10.9978 20.2942 12.7894 18.5026 14.9994 18.5026C12.7894 18.5026 10.9978 16.711 10.9978 14.501Z"
                        stroke="#D1D0FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <span>`,
		`</span></div>`
	);

	// Условие 2: $case
	inputText = processBlocks(
		/<p>\s*<strong>\s*\$case\s*<\/strong>\s*<\/p>|<strong>\s*\$case\s*<\/strong>|<p>\s*\$case\s*<\/p>/,
		/<p>\s*<strong>\s*\$end\s*<\/strong>\s*<\/p>|<strong>\s*\$end\s*<\/strong>|<p>\s*\$end\s*<\/p>/,
		`<div class="block-example">
	<div class="example-title">Пример</div>`,
		`</div>`
	);

	// Условие 3: $biblio
	inputText = processBlocks(
		/<p>\s*<strong>\s*\$biblio\s*<\/strong>\s*<\/p>|<strong>\s*\$biblio\s*<\/strong>|<p>\s*\$biblio\s*<\/p>/,
		/<p>\s*<strong>\s*\$end\s*<\/strong>\s*<\/p>|<strong>\s*\$end\s*<\/strong>|<p>\s*\$end\s*<\/p>/,
		`<div class="color-container container-flex orange-container">
            <div class="container-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M12.9998 17.8658C10.971 15.8359 7.91272 15.4628 5.50472 16.7463C4.82144 17.1105 3.99609 16.6613 3.99609 15.887V6.79116C3.99609 6.1549 4.29022 5.54264 4.80843 5.17349C7.29447 3.40075 10.7689 3.62985 12.9998 5.86078C15.2308 3.62985 18.7052 3.40075 21.1913 5.17349C21.7095 5.54264 22.0036 6.1549 22.0036 6.79116V15.887C22.0036 16.6613 21.1782 17.1115 20.495 16.7463C18.087 15.4628 15.0287 15.8359 12.9998 17.8658Z"
                        stroke="#FFF0EC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M5.50391 20.8845C7.91191 19.601 10.9702 19.9741 12.999 22.004C15.0279 19.9741 18.0861 19.601 20.4941 20.8845"
                        stroke="#FFF0EC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M13.0002 17.8663V5.86133" stroke="#FFF0EC" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
            <span>`,
		`</span></div>`
	);

	// Условие 4: $term
	inputText = processBlocks(
		/<p>\s*<strong>\s*\$term\s*<\/strong>\s*<\/p>|<strong>\s*\$term\s*<\/strong>|<p>\s*\$term\s*<\/p>/,
		/<p>\s*<strong>\s*\$end\s*<\/strong>\s*<\/p>|<strong>\s*\$end\s*<\/strong>|<p>\s*\$end\s*<\/p>/,
		`<div class="term">`,
		`</div>`
	);



	// 1. Заменить <h1> на <p></p><div class="h1"> и </h1> на </div>
	inputText = inputText
		.replace(/<h1(\s+[^>]*)?>/g, '<div class="h1">')
		.replace(/<\/h1>/g, "</div>");

	// 2. Заменить <h2> на <p></p><div class="h2"> и </h2> на </div>
	inputText = inputText
		.replace(/<h2(\s+[^>]*)?>/g, '<div class="h2">')
		.replace(/<\/h2>/g, "</div>");

	// 3. Заменить <h3> на <p></p><div class="h3"> и </h3> на </div>
	inputText = inputText
		.replace(/<h3(\s+[^>]*)?>/g, '<div class="h3">')
		.replace(/<\/h3>/g, "</div>");
	
	//4. Заменяем <h4> на <div class="text-problem-title"> и </h4> на </div>
	inputText = inputText
	.replace(/<h4(\s+[^>]*)?>/g, '<div class="text-problem-title">')
	.replace(/<\/h4>/g, "</div>");
	

	// 5. Заменить <ul> на <ul class="list">
	inputText = inputText.replace(/<ul>/g, '<ul class="list">');

	// 6. Заменить <ol> на <ol class="ordered-list">
	inputText = inputText.replace(/<ol>/g, '<ol class="ordered-list">');

	// 7. Добавить target="_blank" ко всем <a>
	inputText = inputText.replace(
		/<a(?![^>]*target=["']_blank["'])/g,
		'<a target="_blank"'
	);

	//8. Привести таблицу в шаблонный вид
	inputText = inputText.replace(/<table[^>]*>/gi,'<div class="overflow-table">\n<table>\n<tbody>\n').replace(/<\/table[^>]*>/gi,"</tbody>\n</table>\n</div>\n");

	
	
	//==========================================
	//Удаление и замена элементов старой верстки
	//==========================================

	// Замена любого <code> на чистый <code>
	inputText = inputText.replace(/<code\b[^>]*>/gi, "<code>");

	// Замена <span> с атрибутами на простой <span>
	inputText = inputText.replace(/<span\b[^>]*>/gi, "<span>");

	// Замена <strong> с атрибутами на простой <span>
	inputText = inputText.replace(/<strong\b[^>]*>/gi, "<strong>");


	// Замена <div style="padding: 20px; margin: 20px; border: 2px solid #00b43f; border-radius: 10px;"> на <div class="term">
	inputText = inputText.replace(
		/<div\b[^>]*style=["']padding:\s*20px;\s*margin:\s*20px;\s*border:\s*2px\s*solid\s*#00b43f;\s*border-radius:\s*10px;["'][^>]*>/gi,
		'<div class="term">'
	);

	//Удаление комментария <!-- HTML generated using hilite.me -->
	inputText = inputText.replace(
		/<!--\s*HTML generated using hilite\.me\s*-->/gi,
		""
	);

	//Удаление <div style="border-left: 5px solid #00b43f; padding-left: 10px;">, оставляя контент внутри
	inputText = inputText.replace(
		/<div\b[^>]*style=["']border-left:\s*5px\s*solid\s*#00b43f;\s*padding-left:\s*10px;["'][^>]*>([\s\S]*?)<\/div>/gi,
		"$1"
	);
	
	// Замена <tr> с атрибутами на простой <tr>
	inputText = inputText.replace(/<tr\b[^>]*>/gi, "<tr>");

/* 	// Замена <td> с атрибутами на простой <td>
	inputText = inputText.replace(/<td\b[^>]*>/gi, "<td>"); */

	// Замена <p> с атрибутами на простой <p>
	inputText = inputText.replace(/<p\b[^>]*>/gi, "<p>");

	inputText = inputText.replace(
		/(<pre[^>]*>)([\s\S]*?)(<\/pre>)/g,
		(match, p1, p2, p3) => {
			// Удаляем теги <span> и </span> внутри содержимого <pre>
			const cleanedContent = p2.replace(/<\/?span[^>]*>/g, "");
			// Возвращаем результат с сохранением тегов <pre>
			return p1 + cleanedContent + p3;
		}
	);



	inputText = inputText.replace(
		/(<div style="background-color: #f5f5f5; padding: 15px;">)([\s\S]*?)(<\/div>)/,
		(match, p1, p2, p3) => {
			// Замена открывающего тега <div>
			const newOpeningTag =
				'<div class="module-author"><div class="module-author-descr">';
			// Замена закрывающего тега </div> с добавлением еще одного </div>
			const newClosingTag = "</div></div>";
			// Возвращаем результат с замененными тегами
			return newOpeningTag + p2 + newClosingTag;
		}
	);

	inputText = inputText.replace(
		/<div class="important">\s*<p>(.*?)<\/p>\s*<\/div>/gs,
		`<div class="color-container container-flex blue-container">
            <div class="container-icon">
                 <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.99581 3.99658C6.99581 6.20664 5.2042 7.99825 2.99414 7.99825C5.2042 7.99825 6.99581 9.78986 6.99581 11.9999C6.99581 9.78986 8.78741 7.99825 10.9975 7.99825C8.78741 7.99825 6.99581 6.20664 6.99581 3.99658Z" stroke="#D1D0FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0021 16.0017C18.0021 13.2392 15.7626 10.9996 13 10.9996C15.7626 10.9996 18.0021 8.76013 18.0021 5.99756C18.0021 8.76013 20.2416 10.9996 23.0042 10.9996C20.2416 10.9996 18.0021 13.2392 18.0021 16.0017Z" stroke="#D1D0FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9978 14.501C10.9978 16.711 9.20615 18.5026 6.99609 18.5026C9.20615 18.5026 10.9978 20.2942 10.9978 22.5043C10.9978 20.2942 12.7894 18.5026 14.9994 18.5026C12.7894 18.5026 10.9978 16.711 10.9978 14.501Z" stroke="#D1D0FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                 </svg>
                </div>
            <span>$1</span>
        </div>`
	);

	inputText = inputText.replace(
		/<div\s+class="important\s+important-filled">([\s\S]*?)<\/div>/g,
		`<div class="color-container container-flex blue-container">
            <div class="container-icon">
                 <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.99581 3.99658C6.99581 6.20664 5.2042 7.99825 2.99414 7.99825C5.2042 7.99825 6.99581 9.78986 6.99581 11.9999C6.99581 9.78986 8.78741 7.99825 10.9975 7.99825C8.78741 7.99825 6.99581 6.20664 6.99581 3.99658Z" stroke="#D1D0FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0021 16.0017C18.0021 13.2392 15.7626 10.9996 13 10.9996C15.7626 10.9996 18.0021 8.76013 18.0021 5.99756C18.0021 8.76013 20.2416 10.9996 23.0042 10.9996C20.2416 10.9996 18.0021 13.2392 18.0021 16.0017Z" stroke="#D1D0FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9978 14.501C10.9978 16.711 9.20615 18.5026 6.99609 18.5026C9.20615 18.5026 10.9978 20.2942 10.9978 22.5043C10.9978 20.2942 12.7894 18.5026 14.9994 18.5026C12.7894 18.5026 10.9978 16.711 10.9978 14.501Z" stroke="#D1D0FD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                 </svg>
                </div>
            <span>$1</span>
        </div>`
	);

	inputText = inputText.replace(
		/<div\s+class="example">/g,
		'<div class="block-example">'
	);

	inputText = inputText.replace(
		/<figure\s+class="img">\s*<img\s+class="img-bg"\s+src="\/asset-v1:SkillFactory\+MIPTDPM\+SEPT22\+type@asset\+block@star-fill\.svg"\s+width="24"\s+height="24">\s*<\/figure>/g,
		""
	);

	inputText = inputText.replace(/<div class="glossary">/g,'<div class="color-container blue-container">').replace(/<\/h1>/g, "</div>");

	//==========================================
	//Конец блока
	//==========================================
	

	document.querySelectorAll("input[data-checkbox]").forEach((checkbox) => {
		if (checkbox.checked) {
			switch (checkbox.dataset.checkbox) {
				case "main":
					inputText = inputText.replace(/^/, '<div class="main-block">\n').replace(/$/, "\n</div>");
					break;
				case "em":
					// Удаление <em> с атрибутами и его закрывающего тега
					inputText = inputText.replace(/<em\b[^>]*>/gi, "").replace(/<\/em>/gi, "");
					break;
				case "deleteDiv":
					inputText = inputText.replace(/\s*<div\s+class="example-title">\s*Пример\s*<\/div>\s*/gi,"");
					break;
			}
		}
	});

	

	/* inputText = inputText.replace(/<p[^>]*?>\s*(<br>\s*)?<p[^>]*?><span>>>>>.*?<\/span>.*?<\/p>\s*<img src="images\/image\d+\.(jpg|png)"[^>]*>\s*<\/p>/gs, 
    '<figure class="img">\n<img src="" alt="img" width="">\n<p class="grey-text"></p>\n</figure>'); */



	//Замена IMG краказябры на норм шаблон
	inputText = inputText.replace(/<p[^>]*?>\s*(<br>\s*)?<span>>>>>.*?<\/span>\s*(?:<br>.*?)*<img src="images\/image\d+\.(jpg|png|gif)"[^>]*>\s*<\/p>/gs, 
    '<figure class="img">\n<img src="" alt="img" width="">\n<p class="grey-text"></p>\n</figure>');

	
	


	

	// Вывод результата
	document.getElementById("outputText").value = inputText;

	// Копирование в буфер обмена
	navigator.clipboard
		.writeText(outputText.value)
		.then(() => {
			
		})
		.catch((err) => {
			console.error("Ошибка при копировании текста:", err);
		});

});

