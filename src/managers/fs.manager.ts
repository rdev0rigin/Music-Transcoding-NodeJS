import * as fs from 'fs-extra';

export interface SaveDIRResponse {
	ok?: boolean;
	path?: string;
	fileName?: string;
	message?: string;
}

export async function saveToDir(path: string, fileName: string, file: any): Promise<SaveDIRResponse> {
	return await fs.ensureDir(path)
		.then( async () => {
			return await fs.writeFile(`${path}/${fileName}`, file)
				.then((reason: any ) => {
					if (reason) {
						return {ok: false, message: 'file write error'};
					} else {
						return {ok: true, path: `${path}`, fileName:`${fileName}`};
					}
				}
			);
		})
		.catch(err => {
			return {ok: false, message: 'ensure DIR error: ' + err};
	});
}

export async function openFile(sound_id: string): Promise<Buffer> {
	return await fs.readFile(
		`${process.env.PWD}/dcm-file-store/${sound_id}/mp3/${sound_id}.mp3`
	);
}
