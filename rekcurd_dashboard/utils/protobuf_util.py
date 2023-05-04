from werkzeug.datastructures import FileStorage


class ProtobufUtil:
    @staticmethod
    def stream_file(f:FileStorage, size:int=4190000) -> bytes:
        yield from iter(lambda: f.read(size), b'')
