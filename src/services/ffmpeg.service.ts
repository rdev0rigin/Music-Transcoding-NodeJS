import * as fs from 'fs-extra';

const {spawn} = require('child_process');

export async function encodeAudioToFLAC(fileName: string, filePath: string, outputPath: string): Promise<boolean> {
	return await fs.ensureDir(outputPath)
		.then(() => {
			let ffmpeg = spawn(`ffmpeg`, [`-i`, `${filePath}`, `-c:a`, `flac`, `${outputPath}${fileName}.flac`, `-y`]);
			// ffmpeg.stdout.on('data', (data: any) => {
			// 	console.log('flac', data.toString());
			// });
			// ffmpeg.stderr.on('data', (data: any) => {
			// 	console.log(data.toString());
			// });

			ffmpeg.on('exit', (code: string) => {
				console.log('ffmpeg::flac exited with code: ', code);
			});
			return true;
		})
		.catch(err => {
			console.log('error creating DIR for ffmpeg.', err);
			return false;

		});
}

export async function encodeAudioToMP3(fileName: string, filePath: string, outputPath: string): Promise<boolean> {
	return new Promise<boolean>(((resolve, reject) => {
		fs.ensureDir(outputPath)
			.then(() => {
				let ffmpeg = spawn(`ffmpeg`, [`-i`, `${filePath}`, `-codec:a`, `libmp3lame`, `-b:a`, `320k`, `${outputPath}${fileName}.mp3`, `-y`]);
				ffmpeg.on('exit', (code: string) => {
					console.log('ffmpeg::mp3 exited with code: ', code);
					if(0 === parseInt(code)) {
						resolve(true)
					} else {
						reject(false);
					}
				});
			})
			.catch(err => {
				console.log('error creating DIR for ffmpeg.', err);
				reject(false);
			});
		}))
}

