import {
  Box,
  Text,
  useToast,
  Container,
  Heading,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { ObjectTypesManagerContext } from './experiment_root';

export default function ObjectModelManager() {
  const objectTypesManager = React.useContext(ObjectTypesManagerContext);

  const [name, setName] = React.useState('');
  const [objFile, setObjFile] = React.useState<Blob | undefined>(undefined);
  const [mtlFile, setMtlFile] = React.useState<Blob | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!objFile || !name) {
      toast({
        title: 'Error',
        description: 'Please upload an object file and enter a name for the object type.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    if (!(await objectTypesManager.uploadObject(name, objFile, mtlFile))) {
      toast({
        title: 'Error',
        description:
          'An error occurred while uploading the object. Please try again. Maybe same name already exists.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <Box bg="gray.100" p={4}>
      <Container maxW="container.lg">
        <Heading as="h1" size="xl" mb={4}>
          Object Types
        </Heading>
        <SimpleGrid columns={2} gap={4}>
          <Box bg="white" p={4} borderRadius="md">
            <Heading as="h2" size="lg" mb={4}>
              Object Type List
            </Heading>
            {objectTypesManager.objects.map(({ name }) => (
              <Box key={name} mb={4}>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  {name}
                </Text>
              </Box>
            ))}
          </Box>
          <Box bg="white" p={4} borderRadius="md">
            <Heading as="h2" size="lg" mb={4}>
              Upload New Object
            </Heading>
            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel>Object File (.obj)</FormLabel>
                <Input
                  type="file"
                  accept=".obj"
                  onChange={e => setObjFile(e.target.files?.[0])}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Material File (.mtl)</FormLabel>
                <Input
                  type="file"
                  accept=".mtl"
                  onChange={e => setMtlFile(e.target.files?.[0])}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Object Type Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter a name for the object type"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" isLoading={isLoading}>
                Upload
              </Button>
            </form>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
