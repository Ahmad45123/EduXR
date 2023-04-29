import {
  getDownloadURL,
  listAll,
  ref,
  StorageReference,
  uploadBytes,
} from 'firebase/storage';
import { useContext, useEffect, useState } from 'react';
import { useStorage } from 'reactfire';
import { EduXRContext } from '../../app';

export type ObjectType = {
  name: string;
  objFile: string;
  mtlFile?: string;
};

async function checkIfFileExists(ref: StorageReference) {
  try {
    await getDownloadURL(ref);
    return true;
  } catch (error) {
    return false;
  }
}

export type ObjectTypesManager = {
  objects: ObjectType[];
  uploadObject: (objName: string, objFile: Blob) => Promise<boolean>;
};

export function useObjectTypesManager(): ObjectTypesManager {
  const firebaseStorage = useStorage();
  const { username } = useContext(EduXRContext);

  const listRef = ref(firebaseStorage, 'objectTypes/' + username);

  const [objects, setObjects] = useState<ObjectType[]>([]);
  async function getObjects() {
    const res = await listAll(listRef);
    const ret = {} as Record<string, ObjectType>;

    for (const itemRef of res.items) {
      const name = itemRef.name.split('.')[0];
      const ext = itemRef.name.split('.')[1];
      if (ext !== 'glb') continue; // Only support GLB for now.
      ret[name] = {
        name: name,
        objFile: await getDownloadURL(itemRef),
      } as ObjectType;
    }

    return ret;
  }
  function updateObjectsList() {
    getObjects().then(objects => {
      let objsArr = [];
      for (const key in objects) {
        objsArr.push(objects[key]);
      }
      setObjects(objsArr);
    });
  }

  useEffect(() => {
    updateObjectsList();
  }, []);

  async function uploadObject(objName: string, objFile: Blob) {
    const objRef = ref(
      firebaseStorage,
      'objectTypes/' + username + '/' + objName + '.glb',
    );

    if (await checkIfFileExists(objRef)) {
      return false;
    }

    await uploadBytes(objRef, objFile);

    updateObjectsList();
    return true;
  }

  return {
    objects,
    uploadObject,
  };
}
