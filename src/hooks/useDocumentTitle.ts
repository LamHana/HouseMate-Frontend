import { useIsomorphicLayoutEffect } from '.';

export default function useDocumentTitle(title: string): void {
    useIsomorphicLayoutEffect(() => {
        window.document.title = title;
    }, [title]);
}
