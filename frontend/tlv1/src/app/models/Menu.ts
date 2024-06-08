export interface MenuItem {
    value: string;
    text: string;
    checked: boolean;
}

export interface Menu {
    id: string;
    name: string;
    state: boolean;
    items: MenuItem[];
    checkedItems?: string[];
}