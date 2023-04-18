import { useEffect, useState, useContext } from 'react';
import { useStorage } from 'reactfire';
import {
  ref,
  listAll,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from 'firebase/storage';
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
  uploadObject: (
    objName: string,
    objFile: Blob,
    mtlFile: Blob | undefined,
  ) => Promise<boolean>;
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
      if (!ret[name]) {
        ret[name] = {
          name: name,
        } as ObjectType;
      }
      if (ext == 'obj') {
        ret[name].objFile = await getDownloadURL(itemRef);
      } else if (ext == 'mtl') {
        ret[name].mtlFile = await getDownloadURL(itemRef);
      }
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

  async function uploadObject(objName: string, objFile: Blob, mtlFile: Blob | undefined) {
    const objRef = ref(
      firebaseStorage,
      'objectTypes/' + username + '/' + objName + '.obj',
    );

    if (await checkIfFileExists(objRef)) {
      return false;
    }

    await uploadBytes(objRef, objFile);

    if (mtlFile) {
      const mtlRef = ref(
        firebaseStorage,
        'objectTypes/' + username + '/' + objName + '.mtl',
      );
      await uploadBytes(mtlRef, mtlFile);
    }

    updateObjectsList();
    return true;
  }

  return {
    objects,
    uploadObject,
  };
}
