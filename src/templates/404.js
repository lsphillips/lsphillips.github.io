export function render ({
	title,
	byline,
	excuses,
	explanation,
	timestamp
})
{
	return `<!DOCTYPE html>

	<html>

		<head>

			<title>
				${ title }
			</title>

			<meta charset="utf-8" />

			<meta name="viewport" content="width=device-width, initial-scale=1" />

			<link rel="icon" href="/assets/favicons/32x32.png?${ timestamp }"   sizes="32x32"   />
			<link rel="icon" href="/assets/favicons/128x128.png?${ timestamp }" sizes="128x128" />
			<link rel="icon" href="/assets/favicons/192x192.png?${ timestamp }" sizes="192x192" />
			<link rel="icon" href="/assets/favicons/512x512.png?${ timestamp }" sizes="512x512" />

			<link rel="apple-touch-icon" href="/assets/favicons/180x180.png?${ timestamp }" />

			<link href="/styles/404.css?${ timestamp }" rel="stylesheet" />

		</head>

		<body class="page">

			<div class="page__content">

				<div class="not-found">
					<header class="not-found__header">
						<h1 class="not-found__title">
							${ title }
						</h1>
						<h2 class="marquee not-found__byline">
							${ byline }
						</h2>
					</header>
					<p class="not-found__explanation">
						${ explanation }
					</p>
				</div>

			</div>

			<script type="text/javascript">

				window.addEventListener('DOMContentLoaded', function ()
				{
					lsp.enhance({
						excuses : ${ JSON.stringify(excuses) }
					});
				});

			</script>

			<script type="text/javascript" src="/scripts/404.js?${ timestamp }"></script>

		</body>

	</html>`;
}
