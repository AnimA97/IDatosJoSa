using {cuid, managed} from '@sap/cds/common';
namespace cap.billboard;

entity Song : cuid {
	title: String @title: 'Title';
};